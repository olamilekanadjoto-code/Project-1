import "../stylesheets/about.css";
import "@fontsource/dm-sans";
import "@fontsource/inter";
import "@fontsource/roboto";
import "@fontsource/cal-sans";
import "@fontsource/nunito-sans";
import logo from "../src/assets/kestrel-college-crest.svg";

function About() {
  return (
    <>
      <div className="about-component">
        <div className="ac-intro">
          <img className="ai-logo" src={logo} alt="ots-logo" />
          <span className="ai-text-wrapper">
            <h4 className="ai-text-header">ABOUT THE INSTITUTION</h4>
            <h3 className="ai-text-name">Kestrel College</h3>
            <em className="ai-text-descrip">
              Vigilate et discite — "Watch and learn." Founded 1958.
            </em>
          </span>
        </div>
        <div className="history">
          <b className="history-header">
            Kestrel College was founded in 1958 on a simple premise: a student
            is easiest to help the moment before they fall behind, not the
            semester after.
          </b>
          <br />
          <p className="p-1">
            What began as a single liberal arts hall on a converted farm has
            grown into five faculties and a residential campus of just under
            3,400 students. We kept the small-college habits that mattered —
            faculty who know your name, advisors who notice when you go quiet —
            and built the rest of the institution around them.
          </p>
          <br />
          <p className="p-2">
            Our name comes from the kestrel, a falcon that hunts by hovering
            perfectly still, watching the ground below until the right moment to
            act. It's the same instinct we ask of our faculty and advisors:
            watch closely, and know when to step in.
          </p>
        </div>
        <div className="mission-div">
          <h5 className="md-header">OUR MISSION</h5>
          <p className="md-p">
            To educate students who reason carefully, write clearly, and notice
            what others miss — and to notice our own students just as closely.
          </p>
          <div className="md-stats">
            <span className="stats">
              <b>3,400</b>
              <h6>Students</h6>
            </span>
            <span className="stats">
              <b>1.9</b>
              <h6>Dept. Ratio</h6>
            </span>
            <span className="stats">
              <b>5</b>
              <h6>Departments</h6>
            </span>
          </div>
        </div>
        <div className="attributes">
          <h4 className="attr-header">WHAT WE HOLD TO</h4>
          <div className="attr-grid">
            <span className="attr-box">
              <h6 className="ab-header">Rigor</h6>
              <p className="ab-p">
                Small seminars and a faculty who expect students to show their
                reasoning, not just their answers.
              </p>
            </span>
            <span className="attr-box">
              <h6 className="ab-header">Vigilance</h6>
              <p className="ab-p">
                We track every student closely enough to catch a struggle before
                it becomes a pattern.
              </p>
            </span>
            <span className="attr-box">
              <h6 className="ab-header">Community</h6>
              <p className="ab-p">
                Five residential houses keep advising personal from first year
                through graduation.
              </p>
            </span>
            <span className="attr-box">
              <h6 className="ab-header">Access</h6>
              <p className="ab-p">
                Need-blind admission and full-need financial aid for every
                admitted student.
              </p>
            </span>
          </div>
        </div>
        <div className="footer">
          <em>
            "We don't measure a student by one exam. We measure them by whether
            we noticed them in time to help."
          </em>
          <h5>Office of the Dean of Students</h5>
        </div>
      </div>
    </>
  );
}

export default About;
