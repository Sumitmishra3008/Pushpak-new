# Pushpak — Project Synopsis Flowchart

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph Frontend ["Frontend (React + Vite)"]
        UI["User Interface"]
        SC["Socket Client"]
        CTX["Context Providers"]
    end

    subgraph Backend ["Backend (Node.js + Express)"]
        API["REST API Server"]
        SW["Socket.IO Server"]
        MW["Auth Middleware"]
        CTRL["Controllers"]
        SVC["Services"]
    end

    subgraph External ["External Services"]
        GMAP["Google Maps API"]
        DB["MongoDB"]
    end

    UI <-->|HTTP Requests| API
    SC <-->|WebSocket| SW
    CTX --> UI
    API --> MW --> CTRL --> SVC
    SVC <-->|Geocoding / Distance / Autocomplete| GMAP
    SVC <-->|CRUD Operations| DB
```

---

## 2. Complete Application Flow

```mermaid
flowchart TD
    START(["🚀 Application Start"]) --> LANDING["Landing Page (Start)"]
    
    LANDING --> CHOICE{"Select Role"}
    
    %% ===== USER FLOW =====
    CHOICE -->|"User"| U_AUTH{"User Authenticated?"}
    U_AUTH -->|"No"| U_LOGIN["User Login / Signup"]
    U_LOGIN --> U_JWT["Generate JWT Token"]
    U_JWT --> U_STORE["Store Token in LocalStorage"]
    U_STORE --> U_HOME
    U_AUTH -->|"Yes"| U_HOME["User Home Page"]

    %% ===== CAPTAIN FLOW =====
    CHOICE -->|"Captain (Driver)"| C_AUTH{"Captain Authenticated?"}
    C_AUTH -->|"No"| C_LOGIN["Captain Login / Signup"]
    C_LOGIN --> C_JWT["Generate JWT Token"]
    C_JWT --> C_STORE["Store Token in LocalStorage"]
    C_STORE --> C_HOME
    C_AUTH -->|"Yes"| C_HOME["Captain Home Page"]

    %% ===== RIDE BOOKING FLOW (USER) =====
    U_HOME --> SOCKET_U["Connect Socket & Join Room"]
    SOCKET_U --> ENTER_LOC["Enter Pickup & Destination"]
    ENTER_LOC --> AUTOCOMPLETE["Fetch Location Suggestions\n(Google Places API)"]
    AUTOCOMPLETE --> SELECT_LOC["Select Locations"]
    SELECT_LOC --> FIND_TRIP["Click 'Find Trip'"]
    FIND_TRIP --> GET_FARE["GET /rides/get-fare"]
    GET_FARE --> CALC_FARE["Calculate Fare\n(Base + Per Km + Per Min)"]
    CALC_FARE --> SHOW_VEHICLES["Show Vehicle Options\n(Auto / Car / Moto)"]
    SHOW_VEHICLES --> SELECT_VEH["User Selects Vehicle Type"]
    SELECT_VEH --> CONFIRM_RIDE["Confirm Ride"]
    CONFIRM_RIDE --> CREATE_RIDE["POST /rides/create"]
    CREATE_RIDE --> GEN_OTP["Generate 6-digit OTP"]
    GEN_OTP --> SAVE_RIDE["Save Ride to MongoDB\n(status: pending)"]
    SAVE_RIDE --> GEOCODE["Geocode Pickup Address\n(Google Geocoding API)"]
    GEOCODE --> FIND_CAPTAINS["Find Captains in 2 km Radius"]
    FIND_CAPTAINS --> BROADCAST["Broadcast 'new-ride' via Socket\nto All Nearby Captains"]
    BROADCAST --> LOOKING["User sees:\n'Looking for Driver...'"]

    %% ===== CAPTAIN RECEIVES RIDE =====
    C_HOME --> SOCKET_C["Connect Socket & Join Room"]
    SOCKET_C --> UPDATE_LOC["Update Location Every 10s\n(GPS Coordinates via Socket)"]
    UPDATE_LOC --> WAIT_RIDE["Wait for Ride Requests"]
    BROADCAST -.->|"Socket: new-ride"| WAIT_RIDE
    WAIT_RIDE --> RIDE_POPUP["Show Ride Request Popup"]
    RIDE_POPUP --> CAP_DECISION{"Captain Decision"}
    CAP_DECISION -->|"Ignore"| WAIT_RIDE
    CAP_DECISION -->|"Accept"| ACCEPT_RIDE["POST /rides/confirm"]
    ACCEPT_RIDE --> UPDATE_STATUS_ACC["Update Ride Status\n(pending → accepted)"]
    UPDATE_STATUS_ACC --> NOTIFY_USER["Socket: 'ride-confirmed'\nto User"]
    NOTIFY_USER --> SHOW_OTP["Captain Sees OTP Input Screen"]

    %% ===== USER RECEIVES CONFIRMATION =====
    NOTIFY_USER -.->|"Socket: ride-confirmed"| LOOKING
    LOOKING --> DRIVER_ASSIGNED["User sees:\n'Driver Assigned'\n(Captain details shown)"]

    %% ===== RIDE START =====
    SHOW_OTP --> VERIFY_OTP["Captain Enters OTP\nGET /rides/start-ride"]
    VERIFY_OTP --> OTP_CHECK{"OTP Valid?"}
    OTP_CHECK -->|"No"| OTP_ERROR["Show Error:\n'Invalid OTP'"]
    OTP_ERROR --> SHOW_OTP
    OTP_CHECK -->|"Yes"| START_RIDE["Update Ride Status\n(accepted → ongoing)"]
    START_RIDE --> NOTIFY_START["Socket: 'ride-started'\nto User"]
    NOTIFY_START -.->|"Socket: ride-started"| DRIVER_ASSIGNED
    DRIVER_ASSIGNED --> RIDING_USER["User Riding Page\n(Live Tracking on Map)"]
    START_RIDE --> RIDING_CAP["Captain Riding Page\n(Live Tracking on Map)"]

    %% ===== RIDE END =====
    RIDING_CAP --> FINISH["Captain Clicks:\n'Complete Ride'"]
    FINISH --> END_RIDE["POST /rides/end-ride"]
    END_RIDE --> UPDATE_COMPLETE["Update Ride Status\n(ongoing → completed)"]
    UPDATE_COMPLETE --> NOTIFY_END["Socket: 'ride-ended'\nto User"]
    NOTIFY_END -.->|"Socket: ride-ended"| RIDING_USER
    RIDING_USER --> PAYMENT["User: Make Payment"]
    PAYMENT --> DONE(["✅ Ride Complete"])

    %% Styling
    style START fill:#10b981,stroke:#059669,color:#fff
    style DONE fill:#10b981,stroke:#059669,color:#fff
    style CHOICE fill:#6366f1,stroke:#4f46e5,color:#fff
    style CAP_DECISION fill:#6366f1,stroke:#4f46e5,color:#fff
    style OTP_CHECK fill:#6366f1,stroke:#4f46e5,color:#fff
    style U_AUTH fill:#f59e0b,stroke:#d97706,color:#fff
    style C_AUTH fill:#f59e0b,stroke:#d97706,color:#fff
    style BROADCAST fill:#ef4444,stroke:#dc2626,color:#fff
    style NOTIFY_USER fill:#3b82f6,stroke:#2563eb,color:#fff
    style NOTIFY_START fill:#3b82f6,stroke:#2563eb,color:#fff
    style NOTIFY_END fill:#3b82f6,stroke:#2563eb,color:#fff
```

---

## 3. User Authentication Flow

```mermaid
flowchart LR
    A["User/Captain\nVisits App"] --> B{"Has Token?"}
    B -->|"Yes"| C["GET /users/profile\nor /captains/profile"]
    C --> D{"Token Valid?"}
    D -->|"Yes"| E["Redirect to Home"]
    D -->|"No"| F["Redirect to Login"]
    B -->|"No"| F
    F --> G["Enter Credentials"]
    G --> H["POST /users/login\nor /captains/login"]
    H --> I{"Credentials\nValid?"}
    I -->|"Yes"| J["Return JWT Token"]
    J --> K["Store in LocalStorage"]
    K --> E
    I -->|"No"| L["Show Error"]
    L --> F
```

---

## 4. Real-Time Communication Flow (Socket.IO)

```mermaid
sequenceDiagram
    participant U as 👤 User (Rider)
    participant S as ⚡ Socket.IO Server
    participant C as 🚗 Captain (Driver)
    participant DB as 🗄️ MongoDB

    Note over U,C: Connection Phase
    U->>S: connect()
    U->>S: emit("join", {userId, userType: "user"})
    S->>DB: Update user.socketId
    C->>S: connect()
    C->>S: emit("join", {userId, userType: "captain"})
    S->>DB: Update captain.socketId

    Note over C,DB: Location Updates (every 10s)
    loop Every 10 seconds
        C->>S: emit("update-location-captain", {userId, location})
        S->>DB: Update captain.location {ltd, lng}
    end

    Note over U,C: Ride Lifecycle
    U->>S: createRide (via REST API)
    S->>DB: Find captains within 2 km radius
    S-->>C: emit("new-ride", rideWithUser)
    C->>S: confirmRide (via REST API)
    S-->>U: emit("ride-confirmed", ride)
    C->>S: startRide (via REST API, OTP verified)
    S-->>U: emit("ride-started", ride)
    C->>S: endRide (via REST API)
    S-->>U: emit("ride-ended", ride)
```

---

## 5. Fare Calculation Logic

```mermaid
flowchart TD
    A["Pickup & Destination\nAddresses"] --> B["Google Distance Matrix API"]
    B --> C["Get Distance (km)\n& Duration (min)"]
    C --> D["Apply Fare Formula"]
    
    D --> E["🛺 Auto\nBase: ₹30\n+ ₹10/km\n+ ₹2/min"]
    D --> F["🚗 Car\nBase: ₹50\n+ ₹15/km\n+ ₹3/min"]
    D --> G["🏍️ Moto\nBase: ₹20\n+ ₹8/km\n+ ₹1.5/min"]

    E --> H["Display Fares\nto User"]
    F --> H
    G --> H

    style E fill:#fbbf24,stroke:#f59e0b,color:#000
    style F fill:#60a5fa,stroke:#3b82f6,color:#fff
    style G fill:#34d399,stroke:#10b981,color:#fff
```

---

## 6. Database Schema Overview

```mermaid
erDiagram
    USER {
        ObjectId _id
        string firstname
        string lastname
        string email
        string password
        string socketId
    }

    CAPTAIN {
        ObjectId _id
        string firstname
        string lastname
        string email
        string password
        string socketId
        string vehicle_color
        string vehicle_plate
        int vehicle_capacity
        string vehicle_vehicleType
        float location_ltd
        float location_lng
        string status
    }

    RIDE {
        ObjectId _id
        ObjectId user FK
        ObjectId captain FK
        string pickup
        string destination
        number fare
        string status
        number duration
        number distance
        string paymentID
        string orderId
        string signature
        string otp
    }

    BLACKLIST_TOKEN {
        ObjectId _id
        string token
        Date createdAt
    }

    USER ||--o{ RIDE : "requests"
    CAPTAIN ||--o{ RIDE : "accepts"
```

---

## 7. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router DOM |
| **Styling** | TailwindCSS |
| **Animations** | GSAP + @gsap/react |
| **Icons** | Remix Icon |
| **HTTP Client** | Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (jsonwebtoken), bcrypt |
| **Real-Time** | Socket.IO |
| **Maps & Location** | Google Maps API (Geocoding, Distance Matrix, Places Autocomplete) |
| **State Management** | React Context API |

---

## 8. Ride Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending: Ride Created
    Pending --> Accepted: Captain Confirms
    Pending --> Cancelled: User/System Cancels
    Accepted --> Ongoing: OTP Verified & Ride Starts
    Accepted --> Cancelled: Captain/User Cancels
    Ongoing --> Completed: Captain Ends Ride
    Completed --> [*]
    Cancelled --> [*]
```
