import { useState, useRef, useEffect } from "react";

const ABOUT_TEXT = `Vince Ruiz - Computer Engineer

Passionate about embedded systems and software development.
B.Sc. in Computer Engineering (Digital Systems & Software)
from the University of Saskatchewan.

Experienced in:
  - Embedded Systems Design
  - Full-Stack Web Development
  - Software Architecture
  - Cloud Technologies`;

const CONTACT_INFO = {
  GitHub: "github.com/vinceruizz",
  LinkedIn: "linkedin.com/in/vinceruiz",
  Email: "vincedanielruiz@outlook.com"
};

function Terminal() {
  const [history, setHistory] = useState([
    { type: "system", content: "AlfreccOS Terminal v1.0" },
    { type: "system", content: "Type 'help' for available commands" },
    { type: "system", content: "" }
  ]);
  const [input, setInput] = useState("");
  const [projects, setProjects] = useState([]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.vinceruiz.com/project", {
          method: "GET",
          headers: {
            "X-API-KEY": "+A7V2!CX*jT?^]n",
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const formatBox = (title, content) => {
    const lines = content.split("\n");
    const maxLen = Math.max(title.length + 2, ...lines.map((l) => l.length)) + 2;
    const border = "─".repeat(maxLen);

    let box = `┌${border}┐\n`;
    box += `│  ${title.toUpperCase().padEnd(maxLen - 2)}│\n`;
    box += `├${border}┤\n`;
    lines.forEach((line) => {
      box += `│  ${line.padEnd(maxLen - 2)}│\n`;
    });
    box += `└${border}┘`;
    return box;
  };

  const formatHelp = () => {
    const content = `help           Show this message
about          About me
work           List all projects
work <name>    Show project details
contact        Contact information
clear          Clear terminal`;
    return formatBox("Available Commands", content);
  };

  const formatAbout = () => {
    return formatBox("About Me", ABOUT_TEXT);
  };

  const formatContact = () => {
    const content = Object.entries(CONTACT_INFO)
      .map(([key, value]) => `${key.padEnd(10)} ${value}`)
      .join("\n");
    return formatBox("Contact", content);
  };

  const formatWorkList = () => {
    if (projects.length === 0) {
      return "Loading projects... Try again in a moment.";
    }
    const content = projects
      .map((p, i) => `${(i + 1).toString().padStart(2)}. ${p.title}`)
      .join("\n");
    return formatBox("Projects", content + "\n\nUse 'work <number>' for details");
  };

  const formatProject = (query) => {
    if (projects.length === 0) {
      return "Projects not loaded yet. Try again.";
    }

    const num = parseInt(query);
    let project;

    if (!isNaN(num) && num > 0 && num <= projects.length) {
      project = projects[num - 1];
    } else {
      project = projects.find(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.working_name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (!project) {
      return `Project not found: ${query}`;
    }

    const content = `Title: ${project.title}
Code Name: ${project.working_name}

${project.full_description || project.preview_description}

${project.github ? `Links: ${project.github}` : ""}`;

    return formatBox(project.title, content.trim());
  };

  const executeCommand = (cmd, args) => {
    switch (cmd) {
      case "help":
        return formatHelp();
      case "about":
        return formatAbout();
      case "contact":
        return formatContact();
      case "work":
        return args ? formatProject(args) : formatWorkList();
      case "clear":
        setHistory([]);
        return null;
      case "":
        return null;
      default:
        return `Command not found: ${cmd}\nType 'help' for available commands.`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    const [cmd, ...args] = trimmed.toLowerCase().split(" ");
    const output = executeCommand(cmd, args.join(" "));

    const newHistory = [
      ...history,
      { type: "input", content: trimmed }
    ];

    if (output !== null) {
      newHistory.push({ type: "output", content: output });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="app-terminal" onClick={handleClick}>
      <div className="app-terminal__output" ref={outputRef}>
        {history.map((line, i) => (
          <div
            key={i}
            className={`app-terminal__line app-terminal__line--${line.type}`}
          >
            {line.type === "input" && (
              <span className="app-terminal__prompt">&gt; </span>
            )}
            {line.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="app-terminal__input-line">
        <span className="app-terminal__prompt">&gt; </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default Terminal;
