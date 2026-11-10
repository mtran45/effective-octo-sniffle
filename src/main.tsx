import React, { type ReactNode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileVideo,
  Gauge,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import "./styles.css";
type ButtonProps = {
  children?: ReactNode;
  secondary?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

type Finding = [
  title: string,
  category: string,
  priority: "High" | "Medium",
  timestamp: string,
  observation: string,
  impact: string,
  action: string,
  confidence: "High" | "Medium",
  visibility: string,
  drill: string,
];

type StatusProps = { children?: ReactNode; tone?: "green" | "blue" | "yellow" };

const findings: Finding[] = [
  [
    "Create more space at contact",
    "Contact point",
    "High",
    "00:02.1",
    "Contact appears beside the lead hip on two visible swings.",
    "The late contact reduces available court angle and pace.",
    "Create space and contact farther in front.",
    "High",
    "Clear side view",
    "Pause at contact",
  ],
  [
    "Load into your legs",
    "Lower body",
    "Medium",
    "00:04.8",
    "The lower body stays tall through the loading phase.",
    "A quieter load can make the transfer feel rushed.",
    "Sink gently before you start the forward swing.",
    "Medium",
    "Partly visible",
    "Split-step and load",
  ],
];
const Button = ({ children, secondary, icon, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={secondary ? "button secondary" : "button"}
  >
    {icon}
    {children}
  </button>
);
const Status = ({ children, tone = "green" }: StatusProps) => (
  <span className={"status " + tone}>
    <i />
    {children}
  </span>
);
function Shell({ children }) {
  return (
    <div className="shell">
      <aside>
        <Link to="/" className="brand">
          <b>R</b>rally
        </Link>
        <small className="label">COACH WORKSPACE</small>
        <nav>
          <NavLink to="/" end>
            <LayoutDashboard />
            Overview
          </NavLink>
          <NavLink to="/players">
            <Users />
            Players <em>6</em>
          </NavLink>
          <NavLink to="/reviews">
            <ClipboardCheck />
            Reviews <em>3</em>
          </NavLink>
        </nav>
        <div className="bottom">
          <NavLink to="/settings">
            <Settings />
            Settings
          </NavLink>
          <div className="coach">
            <span className="avatar">MT</span>
            <span>
              <strong>Michael Tran</strong>
              <small>Coach</small>
            </span>
            <MoreHorizontal />
          </div>
        </div>
      </aside>
      <main>
        <header className="mobile">
          <Menu />
          <span>rally</span>
          <span className="avatar">MT</span>
        </header>
        {children}
      </main>
    </div>
  );
}
function Header({ eyebrow, title, children }) {
  return (
    <div className="header">
      <div>
        <small>{eyebrow}</small>
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}
function Avatar({
  children,
  large = false,
}: {
  children?: ReactNode;
  large?: boolean;
}) {
  return <span className={"avatar " + (large ? "large" : "")}>{children}</span>;
}
function Row({
  name,
  initials,
  detail,
  date,
  status,
  tone = "green",
  onClick,
}: {
  name: string;
  initials: string;
  detail: string;
  date: string;
  status: string;
  tone?: "green" | "blue" | "yellow";
  onClick?: () => void;
}) {
  return (
    <button className="row" onClick={onClick}>
      <Avatar>{initials}</Avatar>
      <span>
        <strong>{name}</strong>
        <small>{detail}</small>
      </span>
      <span className="row-status">
        <Status tone={tone}>{status}</Status>
        <small>{date}</small>
      </span>
      <ChevronRight />
    </button>
  );
}
function Overview() {
  let nav = useNavigate();
  return (
    <>
      <Header eyebrow="Tuesday, October 8" title="Good morning, Michael.">
        <Button icon={<Plus />} onClick={() => nav("/reviews/new")}>
          New review
        </Button>
      </Header>
      <section className="welcome">
        <div>
          <Sparkles />
          <span>
            <strong>Your coaching workspace</strong>
            <small>
              Keep feedback focused, evidence-based, and easy to act on.
            </small>
          </span>
        </div>
        <X />
      </section>
      <div className="stats">
        <Stat
          icon={<ClipboardCheck />}
          label="Active reviews"
          value="3"
          note="2 ready to share"
        />
        <Stat
          icon={<Users />}
          label="Players"
          value="6"
          note="1 new this week"
        />
        <Stat
          icon={<Activity />}
          label="Practice plans"
          value="8"
          note="Across all players"
        />
      </div>
      <div className="grid">
        <section className="card">
          <Head
            title="Recent reviews"
            note="Your latest player-coach work."
            link="View all"
          />
          <Row
            name="Alex Morgan"
            initials="AM"
            detail="Forehand · Side view"
            date="Updated today"
            status="In review"
            onClick={() => nav("/reviews/alex-morgan")}
          />
          <Row
            name="Priya Shah"
            initials="PS"
            detail="Forehand · Rear view"
            date="Shared yesterday"
            status="Shared"
            tone="blue"
            onClick={() => nav("/reviews/priya-shah")}
          />
          <Row
            name="Jon Bell"
            initials="JB"
            detail="Forehand · Diagonal view"
            date="Uploaded Oct 5"
            status="Processing"
            tone="yellow"
          />
        </section>
        <section className="card">
          <Head title="Upcoming" note="Keep players moving forward." />
          <div className="upcoming">
            <b>
              14<small>OCT</small>
            </b>
            <span>
              <strong>Follow up with Alex Morgan</strong>
              <small>Review progress and assign next drill</small>
            </span>
            <Clock3 />
          </div>
          <div className="upcoming">
            <b>
              18<small>OCT</small>
            </b>
            <span>
              <strong>Priya · Practice check-in</strong>
              <small>Player has a question on the shared review</small>
            </span>
            <MessageCircle />
          </div>
        </section>
      </div>
    </>
  );
}
function Stat({ icon, label, value, note }) {
  return (
    <div className="card stat">
      {icon}
      <span>
        {label}
        <strong>{value}</strong>
        <small>{note}</small>
      </span>
    </div>
  );
}
function Head({
  title,
  note,
  link,
}: {
  title: string;
  note?: string;
  link?: string;
}) {
  return (
    <div className="head">
      <span>
        <h2>{title}</h2>
        <small>{note}</small>
      </span>
      {link && (
        <Link to="/reviews">
          {link} <ChevronRight />
        </Link>
      )}
    </div>
  );
}
function Reviews() {
  let nav = useNavigate();
  return (
    <>
      <Header eyebrow="Workspace" title="Reviews">
        <Button icon={<Plus />} onClick={() => nav("/reviews/new")}>
          New review
        </Button>
      </Header>
      <div className="toolbar">
        <div>
          <Search />
          <input placeholder="Search players or reviews" />
        </div>
        <select>
          <option>All statuses</option>
          <option>In review</option>
          <option>Shared</option>
        </select>
      </div>
      <section className="card list">
        <div className="list-head">
          PLAYER <span>REVIEW</span>
          <span>STATUS</span>
          <span>UPDATED</span>
        </div>
        <Row
          name="Alex Morgan"
          initials="AM"
          detail="Forehand · Side view"
          date="Today, 9:42 AM"
          status="In review"
          onClick={() => nav("/reviews/alex-morgan")}
        />
        <Row
          name="Priya Shah"
          initials="PS"
          detail="Forehand · Rear view"
          date="Yesterday"
          status="Shared"
          tone="blue"
        />
        <Row
          name="Jon Bell"
          initials="JB"
          detail="Forehand · Diagonal view"
          date="Oct 5"
          status="Processing"
          tone="yellow"
        />
      </section>
    </>
  );
}
function Detail() {
  let { player = "alex-morgan" } = useParams();
  let name =
    player === "priya-shah"
      ? "Priya Shah"
      : player === "jon-bell"
        ? "Jon Bell"
        : "Alex Morgan";
  let [tab, setTab] = useState("findings");
  return (
    <>
      <div className="top">
        <Link to="/reviews">
          <ArrowLeft /> All reviews
        </Link>
        <div>
          <Button secondary icon={<MessageCircle />}>
            Add comment
          </Button>
          <Button icon={<Check />}>Share review</Button>
        </div>
      </div>
      <div className="review-title">
        <Avatar large>
          {name
            .split(" ")
            .map((x) => x[0])
            .join("")}
        </Avatar>
        <span>
          <small>Forehand review · Side view</small>
          <h1>{name}</h1>
          <label>
            <Status /> <span>Uploaded Oct 7, 2024</span>{" "}
            <span>Private to you and {name.split(" ")[0]}</span>
          </label>
        </span>
      </div>
      <div className="tabs">
        <button
          className={tab === "findings" ? "active" : ""}
          onClick={() => setTab("findings")}
        >
          Findings <b>2</b>
        </button>
        <button onClick={() => setTab("clip")}>Clip & metadata</button>
        <button onClick={() => setTab("activity")}>Activity</button>
      </div>
      {tab === "findings" ? (
        <div className="review-grid">
          <section>
            <Head
              title="Technique findings"
              note="AI observations ready for your review."
            />
            <div className="notice">
              <Sparkles />
              <span>
                <strong>Analysis complete</strong> Findings are ordered by
                priority. Confirm or edit each one before sharing.
              </span>
            </div>
            {findings.map((f, i) => (
              <Finding key={i} f={f} />
            ))}
          </section>
          <aside>
            <Video />
            <div className="card summary">
              <Head title="Coach summary" />
              <p>
                Write a concise summary with one strength, up to three
                priorities, and a next practice action.
              </p>
              <textarea placeholder="Alex does a good job of..." />
              <Button>Save summary</Button>
            </div>
          </aside>
        </div>
      ) : (
        <div className="card placeholder">
          <h2>{tab === "clip" ? "Clip & metadata" : "Activity history"}</h2>
          <p>
            This section is ready for the next implementation step. The workflow
            contract will keep clip metadata and append-only coach actions
            auditable here.
          </p>
        </div>
      )}
    </>
  );
}
function Finding({ f }) {
  return (
    <article className="card finding">
      <div className="finding-top">
        <span className="priority">
          <i className={f[2].toLowerCase()} />
          {f[2]} priority
        </span>
        <span className="ai">
          <Sparkles /> AI observation
        </span>
      </div>
      <h3>{f[0]}</h3>
      <div className="tags">
        <span>{f[1]}</span>
        <button>
          <Play />
          {f[3]}
        </button>
      </div>
      <div className="feedback">
        <div>
          <label>WHAT WE SAW</label>
          <p>{f[4]}</p>
        </div>
        <div>
          <label>WHY IT MATTERS</label>
          <p>{f[5]}</p>
        </div>
        <div>
          <label>TRY THIS</label>
          <p>{f[6]}</p>
        </div>
      </div>
      <div className="finding-bottom">
        <span>
          <Gauge />
          <strong>{f[7]} confidence</strong> · {f[8]}
        </span>
        <span>
          <Activity /> Drill: <strong>{f[9]}</strong>
        </span>
        <div>
          <button>Dismiss</button>
          <Button secondary>Review & edit</Button>
          <Button icon={<Check />}>Accept</Button>
        </div>
      </div>
    </article>
  );
}
function Video() {
  return (
    <div className="card video">
      <div className="preview">
        <button>
          <Play fill="currentColor" />
        </button>
        <span>00:02 / 00:08</span>
      </div>
      <div className="video-caption">
        <FileVideo /> alex_forehand_side.mp4{" "}
        <small>1080p · 60fps · 8.2 MB</small>
      </div>
    </div>
  );
}
function NewReview() {
  let nav = useNavigate();
  return (
    <>
      <div className="top">
        <Link to="/reviews">
          <ArrowLeft /> All reviews
        </Link>
      </div>
      <Header eyebrow="New review" title="Start a forehand review">
        <small>Step 1 of 3</small>
      </Header>
      <section className="card form">
        <h2>
          <b>1</b>Select a player
        </h2>
        <p>Choose who this review is for. You can add a new player later.</p>
        <div className="choice selected">
          <Avatar>AM</Avatar>
          <span>
            <strong>Alex Morgan</strong>
            <small>Right-handed · 12 reviews</small>
          </span>
          <Check />
        </div>
        <div className="choice">
          <Avatar>PS</Avatar>
          <span>
            <strong>Priya Shah</strong>
            <small>Right-handed · 8 reviews</small>
          </span>
        </div>
        <button className="add">
          <Plus /> Add a new player
        </button>
        <div className="actions">
          <Button secondary onClick={() => nav("/reviews")}>
            Cancel
          </Button>
          <Button onClick={() => nav("/reviews/new/upload")}>
            Continue <ChevronRight />
          </Button>
        </div>
      </section>
    </>
  );
}
function Upload() {
  return (
    <>
      <div className="top">
        <Link to="/reviews/new">
          <ArrowLeft /> Back
        </Link>
      </div>
      <Header eyebrow="New review · Alex Morgan" title="Upload a clip">
        <small>Step 2 of 3</small>
      </Header>
      <section className="card form">
        <h2>
          <b>2</b>Add your clip
        </h2>
        <p>
          One playable clip with the required details is all you need to begin.
        </p>
        <div className="drop">
          <FileVideo />
          <strong>Drop a video here, or browse</strong>
          <small>MP4, MOV, or WebM · Up to 500 MB</small>
          <Button secondary>Browse files</Button>
        </div>
        <div className="fields">
          <label>
            Recorded on
            <input type="date" defaultValue="2024-10-07" />
          </label>
          <label>
            View angle
            <select>
              <option>Side</option>
              <option>Rear</option>
              <option>Front</option>
            </select>
          </label>
          <label>
            Shot intent
            <select>
              <option>Drive</option>
              <option>Roll</option>
              <option>Volley</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <Button secondary>Save draft</Button>
          <Button>
            Continue <ChevronRight />
          </Button>
        </div>
      </section>
    </>
  );
}
function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/players" element={<Overview />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/new" element={<NewReview />} />
        <Route path="/reviews/new/upload" element={<Upload />} />
        <Route path="/reviews/:player" element={<Detail />} />
        <Route
          path="/settings"
          element={
            <div className="card placeholder">
              <h2>Settings</h2>
            </div>
          }
        />
      </Routes>
    </Shell>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
