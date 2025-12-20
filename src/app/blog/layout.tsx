import Link from "next/link";
import Image from "next/image";
import { Search, Bell, User } from "lucide-react";
import "./blog.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="devto-container">
      {/* DEV.TO-style Header */}
      <header className="devto-header">
        <div className="header-container">
          <div className="header-left">
            <Link href="/blog" className="logo">
              <span className="logo-text">✍️</span>
              <span className="logo-name">SojournBlog</span>
            </Link>
            <nav className="nav-links">
              <Link href="/blog" className="nav-link active">
                Home
              </Link>
              <Link href="/blog/tags" className="nav-link">
                Tags
              </Link>
              <Link href="/blog/guides" className="nav-link">
                Guides
              </Link>
              <Link href="/blog/news" className="nav-link">
                News
              </Link>
            </nav>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <Search size={18} />
              <input type="search" placeholder="Search articles..." />
            </div>
            <button className="notification-btn">
              <Bell size={20} />
            </button>
            <button className="user-btn">
              <User size={20} />
            </button>
            <button className="create-post-btn">Create Post</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="devto-main">
        <aside className="sidebar-left">
          <div className="sidebar-widget">
            <h3>📌 Trending Tags</h3>
            <div className="tags-list">
              <span className="tag">#travel</span>
              <span className="tag">#abuja</span>
              <span className="tag">#shortlets</span>
              <span className="tag">#weekend</span>
              <span className="tag">#nigeria</span>
              <span className="tag">#luxury</span>
              <span className="tag">#budget</span>
              <span className="tag">#vacation</span>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3>🔥 Hot This Week</h3>
            <ul className="hot-list">
              <li>
                <Link href="#">Lagos vs Abuja: Where to Weekend?</Link>
                <span className="reactions">🔥 245</span>
              </li>
              <li>
                <Link href="#">Top 10 Rooftop Bars in Abuja</Link>
                <span className="reactions">🔥 189</span>
              </li>
              <li>
                <Link href="#">How to Save on Shortlets</Link>
                <span className="reactions">🔥 167</span>
              </li>
            </ul>
          </div>
        </aside>

        <main className="content-area">{children}</main>

        <aside className="sidebar-right">
          <div className="sidebar-widget about-widget">
            <div className="author-card">
              <div className="author-avatar">✈️</div>
              <div className="author-info">
                <h4>Sojourn Team</h4>
                <p>
                  We help you find perfect shortlets in Nigeria. Verified stays.
                  No scams.
                </p>
              </div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>

          <div className="sidebar-widget">
            <h3>📅 Latest Posts</h3>
            <ul className="latest-posts">
              <li>
                <Link href="#">Port Harcourt Weekend Guide</Link>
                <span className="post-date">2 days ago</span>
              </li>
              <li>
                <Link href="#">Workation Spots in Lagos</Link>
                <span className="post-date">5 days ago</span>
              </li>
              <li>
                <Link href="#">Beach Houses in Calabar</Link>
                <span className="post-date">1 week ago</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-widget newsletter">
            <h3>📬 Newsletter</h3>
            <p>Get weekly travel tips & exclusive deals</p>
            <input type="email" placeholder="Your email" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </aside>
      </div>

      {/* Reactions Footer */}
      <div className="reactions-bar">
        <div className="reaction-buttons">
          <button className="reaction-btn">
            <span className="reaction-emoji">❤️</span>
            <span className="reaction-count">42</span>
          </button>
          <button className="reaction-btn">
            <span className="reaction-emoji">👏</span>
            <span className="reaction-count">18</span>
          </button>
          <button className="reaction-btn">
            <span className="reaction-emoji">🔥</span>
            <span className="reaction-count">7</span>
          </button>
          <button className="reaction-btn">
            <span className="reaction-emoji">💬</span>
            <span className="reaction-count">12</span>
          </button>
          <button className="reaction-btn">
            <span className="reaction-emoji">🔖</span>
            <span className="reaction-count">5</span>
          </button>
        </div>

        <div className="action-buttons">
          <button className="share-btn">Share</button>
          <button className="save-btn">Save</button>
          <button className="more-btn">⋯</button>
        </div>
      </div>

      {/* DEV.TO-style Footer */}
      <footer className="devto-footer">
        <div className="footer-content">
          <div className="footer-logo">SojournBlog</div>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/help">Help</Link>
          </div>
          <div className="footer-copy">© 2024 SojournBlog</div>
        </div>
      </footer>
    </div>
  );
}
