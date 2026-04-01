import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  const [visible, setVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const teamMembers = [
    { name: 'Sumit Mishra', rollNo: '2200521520059', initial: 'SM' },
    { name: 'Shashank Singh', rollNo: '2200521520051', initial: 'SS' },
    { name: 'Pratham Kumar', rollNo: '2200521520038', initial: 'PK' },
  ]

  return (
    <div className="start-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

        .start-page {
          font-family: 'Inter', sans-serif;
          background: #0a0a0f;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 0%, rgba(99, 61, 15, 0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 50%, rgba(30, 27, 75, 0.3) 0%, transparent 50%),
                      radial-gradient(ellipse at 20% 80%, rgba(88, 28, 135, 0.15) 0%, transparent 50%),
                      #0a0a0f;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          z-index: 0;
        }

        .hero-content {
          text-align: center;
          z-index: 1;
          padding: 2rem;
          max-width: 800px;
        }

        .college-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards 0.2s;
        }

        .project-label {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.4s;
        }

        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 30%, #f59e0b 60%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.6s;
        }

        .hero-subtitle {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem;
          font-style: italic;
          color: #94a3b8;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.8s;
        }

        .hero-tagline {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 500px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 1s;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #475569;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 1.2s;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #f59e0b, transparent);
          animation: scrollPulse 2s ease infinite;
        }

        /* Sections */
        .section {
          padding: 5rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .section-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #f59e0b, #d97706);
          margin: 0 auto 1.5rem;
          border-radius: 2px;
        }

        .section-label {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 0.75rem;
        }

        .section-title {
          text-align: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 2.5rem;
        }

        /* Problem Statement */
        .problem-section {
          background: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%);
          border-top: 1px solid rgba(245, 158, 11, 0.05);
        }

        .problem-card {
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.3) 0%, rgba(15, 15, 26, 0.8) 100%);
          border: 1px solid rgba(245, 158, 11, 0.1);
          border-radius: 1.25rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .problem-card::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 20px;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 8rem;
          color: rgba(245, 158, 11, 0.06);
          line-height: 1;
        }

        .problem-text {
          font-size: 1.05rem;
          line-height: 1.9;
          color: #cbd5e1;
          position: relative;
          z-index: 1;
        }

        .problem-text strong {
          color: #fbbf24;
          font-weight: 600;
        }

        .problem-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .highlight-item {
          background: rgba(245, 158, 11, 0.04);
          border: 1px solid rgba(245, 158, 11, 0.08);
          border-radius: 0.75rem;
          padding: 1.25rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .highlight-item:hover {
          border-color: rgba(245, 158, 11, 0.25);
          background: rgba(245, 158, 11, 0.08);
          transform: translateY(-2px);
        }

        .highlight-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .highlight-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Features */
        .features-section {
          border-top: 1px solid rgba(245, 158, 11, 0.05);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .feature-card {
          background: rgba(15, 15, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 1rem;
          padding: 1.75rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: rgba(245, 158, 11, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.05);
        }

        .feature-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.04));
          border: 1px solid rgba(245, 158, 11, 0.15);
        }

        .feature-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* Team */
        .team-section {
          background: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%);
          border-top: 1px solid rgba(245, 158, 11, 0.05);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .team-card {
          background: rgba(15, 15, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          border-color: rgba(245, 158, 11, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(245, 158, 11, 0.06);
        }

        .team-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          border: 2px solid rgba(245, 158, 11, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fbbf24;
        }

        .team-name {
          font-weight: 600;
          font-size: 1rem;
          color: #f1f5f9;
          margin-bottom: 0.25rem;
        }

        .team-roll {
          font-size: 0.75rem;
          color: #64748b;
          font-family: 'SF Mono', 'Fira Code', monospace;
          letter-spacing: 0.05em;
        }

        /* Acknowledgments */
        .ack-section {
          border-top: 1px solid rgba(245, 158, 11, 0.05);
        }

        .ack-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ack-card {
          background: rgba(15, 15, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 1rem;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          transition: all 0.3s ease;
        }

        .ack-card:hover {
          border-color: rgba(245, 158, 11, 0.12);
        }

        .ack-card.memorial {
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.2) 0%, rgba(15, 15, 26, 0.6) 100%);
          border-color: rgba(245, 158, 11, 0.12);
        }

        .ack-icon-wrap {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent);
          border: 1px solid rgba(245, 158, 11, 0.1);
        }

        .ack-role {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 0.25rem;
        }

        .ack-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 0.25rem;
        }

        .ack-tribute {
          font-size: 0.8rem;
          color: #64748b;
          font-style: italic;
          line-height: 1.5;
        }

        .memorial-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          color: #94a3b8;
          margin-top: 0.35rem;
        }

        /* CTA */
        .cta-section {
          padding: 5rem 1.5rem 4rem;
          text-align: center;
          border-top: 1px solid rgba(245, 158, 11, 0.05);
          background: radial-gradient(ellipse at 50% 100%, rgba(99, 61, 15, 0.1) 0%, transparent 60%);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 3rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #0a0a0f;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.25);
          letter-spacing: 0.02em;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.35);
        }

        .cta-btn-captain {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 2.5rem;
          background: transparent;
          color: #f59e0b;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 100px;
          text-decoration: none;
          border: 1px solid rgba(245, 158, 11, 0.3);
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .cta-btn-captain:hover {
          background: rgba(245, 158, 11, 0.06);
          border-color: rgba(245, 158, 11, 0.5);
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2.5rem;
        }

        .tech-tag {
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 100px;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Footer */
        .footer {
          padding: 2rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 0.75rem;
          color: #334155;
        }

        .footer a {
          color: #64748b;
          text-decoration: none;
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 8s ease infinite;
        }

        .glow-orb-1 {
          width: 300px; height: 300px;
          background: #f59e0b;
          top: 10%; left: 10%;
        }

        .glow-orb-2 {
          width: 250px; height: 250px;
          background: #6366f1;
          bottom: 20%; right: 10%;
          animation-delay: 3s;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title { font-size: 3.2rem; }
          .problem-highlights { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .team-grid { grid-template-columns: 1fr; }
          .section { padding: 3.5rem 1.25rem; }
          .section-title { font-size: 1.8rem; }
        }
      `}</style>

      {/* ========== HERO ========== */}
      <section className="hero-section">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="hero-content">
          <div className="college-badge">
            🎓 Institute of Engineering and Technology, Lucknow
          </div>
          <p className="project-label">B.Tech Major Project · 2025–26</p>
          <h1 className="hero-title">Pushpak</h1>
          <p className="hero-subtitle">Smart Ride-Hailing System with Real-Time Tracking</p>
          <p className="hero-tagline">
            A full-stack intelligent transportation platform built to modernize urban commuting 
            through real-time GPS tracking, dynamic fare computation, and seamless rider-driver matching.
          </p>
        </div>
        <div className="scroll-indicator">
          <span>Explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ========== PROBLEM STATEMENT ========== */}
      <section className="problem-section">
        <div className="section">
          <div className="section-divider"></div>
          <p className="section-label">The Challenge</p>
          <h2 className="section-title">Problem Statement</h2>
          <div className="problem-card">
            <p className="problem-text">
              Urban transportation in India faces <strong>critical inefficiencies</strong> — fragmented 
              ride-hailing systems, <strong>lack of real-time communication</strong> between riders and 
              drivers, <strong>opaque fare structures</strong>, and unreliable ride matching that leaves 
              both passengers and drivers stranded.
              <br /><br />
              Existing solutions are often <strong>monolithic, proprietary platforms</strong> that fail 
              to demonstrate the underlying architecture and real-time capabilities that power modern 
              mobility systems. There is a clear need for a <strong>transparent, end-to-end 
              ride-hailing solution</strong> that showcases real-time location tracking, intelligent 
              driver matching based on proximity, dynamic fare calculation, and <strong>secure 
              socket-based communication</strong> — all built on a modern, scalable technology stack.
              <br /><br />
              <strong>Pushpak</strong> addresses this gap by implementing a comprehensive ride-hailing 
              system that integrates Google Maps API for live tracking and geocoding, Socket.IO for 
              instant bidirectional event-driven communication, and a robust REST API architecture — 
              providing a <strong>production-grade, fully functional prototype</strong> that demonstrates 
              the engineering principles behind modern transportation platforms.
            </p>
            <div className="problem-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">📡</div>
                <div className="highlight-label">Real-Time Tracking</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🧠</div>
                <div className="highlight-label">Smart Matching</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">💰</div>
                <div className="highlight-label">Dynamic Pricing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== KEY FEATURES ========== */}
      <section className="features-section">
        <div className="section">
          <div className="section-divider"></div>
          <p className="section-label">What We Built</p>
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3 className="feature-title">Live GPS Tracking</h3>
              <p className="feature-desc">
                Real-time location tracking using Google Maps API with continuous position updates 
                for both riders and captains.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Ride Matching</h3>
              <p className="feature-desc">
                Socket.IO powered real-time notifications — nearby drivers receive ride requests 
                instantly with geospatial proximity matching.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3 className="feature-title">OTP Verification</h3>
              <p className="feature-desc">
                Secure ride initiation through one-time password verification ensuring passenger 
                safety and ride authenticity.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Dynamic Fare Engine</h3>
              <p className="feature-desc">
                Multi-vehicle fare calculation using Google Distance Matrix API factoring distance, 
                duration, and vehicle type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="team-section">
        <div className="section">
          <div className="section-divider"></div>
          <p className="section-label">The Team</p>
          <h2 className="section-title">Developed By</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div className="team-card" key={member.rollNo}>
                <div className="team-avatar">{member.initial}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-roll">{member.rollNo}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Final Year · B.Tech in Computer Science Engineering (Artificial Intelligence)
            </p>
          </div>
        </div>
      </section>

      {/* ========== ACKNOWLEDGMENTS ========== */}
      <section className="ack-section">
        <div className="section">
          <div className="section-divider"></div>
          <p className="section-label">Gratitude</p>
          <h2 className="section-title">Acknowledgments</h2>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: '650px', margin: '0 auto 2.5rem', fontStyle: 'italic' }}>
            We extend our heartfelt gratitude to the following mentors whose 
            unwavering guidance and support made this project possible.
          </p>
          <div className="ack-grid">
            {/* Supervisor */}
            <div className="ack-card memorial">
              <div className="ack-icon-wrap">🕯️</div>
              <div>
                <p className="ack-role">Project Supervisor</p>
                <h3 className="ack-name">Late Prof. Diwakar Singh Yadav</h3>
                <p className="ack-tribute">
                  In loving memory — we are forever indebted for his foundational vision, 
                  encouragement, and the principles he instilled in us. His guidance continues 
                  to inspire every line of this project.
                </p>
                <div className="memorial-badge">
                  <span>✦</span>
                  <span>Forever in our hearts</span>
                </div>
              </div>
            </div>

            {/* Co-supervisor */}
            <div className="ack-card">
              <div className="ack-icon-wrap">📘</div>
              <div>
                <p className="ack-role">Co-Supervisor</p>
                <h3 className="ack-name">Ms. Deepa Verma</h3>
                <p className="ack-tribute">
                  For her consistent mentorship, insightful reviews, and the 
                  academic rigor that shaped this project at every milestone.
                </p>
              </div>
            </div>

            {/* Project Coordinators */}
            <div className="ack-card">
              <div className="ack-icon-wrap">🎯</div>
              <div>
                <p className="ack-role">Project Coordinator</p>
                <h3 className="ack-name">Mrs. Deepali Awasthi</h3>
                <p className="ack-tribute">
                  For her exceptional coordination, timely scheduling, and 
                  ensuring a smooth and structured project workflow.
                </p>
              </div>
            </div>

            <div className="ack-card">
              <div className="ack-icon-wrap">🎯</div>
              <div>
                <p className="ack-role">Project Coordinator</p>
                <h3 className="ack-name">Prof. Manik Chandra</h3>
                <p className="ack-tribute">
                  For his valuable technical insights and continuous support 
                  in steering the project to successful completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '0.75rem' }}>
          Experience the Platform
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
          Ready to Ride?
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>
          Step into Pushpak — sign in as a rider or a captain
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/login" className="cta-btn">
            Continue as Rider →
          </Link>
          <Link to="/captain-login" className="cta-btn-captain">
            Sign in as Captain
          </Link>
        </div>

        <div className="tech-stack">
          <span className="tech-tag">React.js</span>
          <span className="tech-tag">Node.js</span>
          <span className="tech-tag">Express</span>
          <span className="tech-tag">MongoDB</span>
          <span className="tech-tag">Socket.IO</span>
          <span className="tech-tag">Google Maps API</span>
          <span className="tech-tag">JWT Auth</span>
          <span className="tech-tag">GSAP</span>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <p>
          Pushpak · Major Project 2025–26 · Institute of Engineering and Technology, Lucknow
        </p>
        <p style={{ marginTop: '0.35rem' }}>
          Department of Computer Science Engineering (Artificial Intelligence)
        </p>
      </footer>
    </div>
  )
}

export default Start