/** @jsx jsxMaker */

// ⬆️ Magic comment that tells the transpiler to inject calls to the `jsxMaker()` function for each node.

function jsxMaker(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null
  return { nodeName, attributes, children }
}

// a simple JSX "view"
let virtualDOM = (
  <div id="foo">
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
  </div>
)

/** Render Virtual DOM to the real DOM */
function render(virtualNode) {
  // String should be a simple text node. No need for fancy code.
  if (typeof virtualNode === "string")
    return document.createTextNode(virtualNode)

  let newNode = document.createElement(virtualNode.nodeName) // div
  let attributes = virtualNode.attributes || {} //id: foo
  let children = virtualNode.children || [] // ul>li

  Object.keys(attributes).forEach((attribute) =>
    newNode.setAttribute(attribute, virtualNode.attributes[attribute])
  )

  // Recursion for child nodes
  children.forEach((child) => newNode.appendChild(render(child)))
  return newNode
}

let dom = render(virtualDOM)
document.body.appendChild(dom)
