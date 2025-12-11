import "./index.css";
import Lanyard from "./component/Lanyard";
import TextPressure from "./component/TextPressure";
import CardNav from "./component/CardNav";
import logo from "./assets/react.svg";
import ScrambledText from "./component/ScrambledText";

function App() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          ariaLabel: "Featured Projects",
          href: "/projects/featured",
        },
        {
          label: "Case Studies",
          ariaLabel: "Project Case Studies",
          href: "/projects/cases",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          ariaLabel: "Email us",
          href: "mailto:example@example.com",
        },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
        {
          label: "LinkedIn",
          ariaLabel: "LinkedIn",
          href: "https://linkedin.com",
        },
      ],
    },
  ];

  return (
    <>
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      {/* ================== SECTION 1: Fullscreen Text ================== */}
      <div className="h-screen flex items-center justify-center py-20 px-10 bg-black">
        <TextPressure />
      </div>

      {/* ================== SECTION 2: Content with Lanyard ================== */}
      <div className="h-fit bg-neutral-900 flex">
        {/* LEFT SECTION 3/4 */}
        <div className="w-3/4 flex flex-col justify-center text-white">
          <ScrambledText
            className="scrambled-text-demo"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars={".:"}
          >
            I am a second-year Information Systems student at Brawijaya
            University, highly enthusiastic about technology and an avid reader.
            I have a self-motivated and optimistic attitude, and I am capable of
            thriving in challenging and dynamic environments. Currently, I am
            looking to improve my skills and contribute to a professional
            organization. I am very eager to learn new things that interest me
            and can help me grow.
          </ScrambledText>
        </div>

        {/* RIGHT SECTION 1/4 */}
        <div className="w-1/4 p-5 flex justify-center items-center overflow-visible">
          <div className="flex justify-center items-center overflow-visible">
            <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
