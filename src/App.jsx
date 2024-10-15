import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
Or *italic*.
Or... **_both!_**
There's also [links](https://www.freecodecamp.com), and
> Block Quotes!
![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)
- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.
`;

const App = () => {
  const [markdownText, setMarkdownText] = useState(defaultMarkdown);

  const renderMarkdown = (markdown) => {
    const renderLine = (line) => {
      // This is a simplified markdown rendering logic
      // In a real-world scenario, you'd want to use a more robust parsing method
      if (line.startsWith('# ')) return <h1>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2>{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3>{line.slice(4)}</h3>;
      if (line.startsWith('> ')) return <blockquote>{line.slice(2)}</blockquote>;
      if (line.startsWith('- ')) return <li>{line.slice(2)}</li>;
      if (line.startsWith('![')) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) return <img src={match[2]} alt={match[1]} />;
      }
      if (line.includes('`')) {
        return line.split('`').map((part, index) => 
          index % 2 === 0 ? part : <code key={index}>{part}</code>
        );
      }
      return line;
    };

    return markdown.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {renderLine(line)}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
    <div>
      <h1 style={{ textAlign: "center" }}>Markdown Previewer</h1>
      <div className="boxes-container">
        <textarea
          name="editor"
          id="editor"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
        ></textarea>
        <div id="preview">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  </>
  );
};

export default App;