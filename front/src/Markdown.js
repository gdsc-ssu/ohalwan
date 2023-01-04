import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const aaa = "```python\n  print('A') \n```";

function Markdown({ code }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      children={code}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {/* {console.log(code)} */}
    </ReactMarkdown>
  );
}

export default Markdown;
// ("```python3\nprint(1111)\n```");
// heart: 0;
