/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/domelementtype/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/domelementtype/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
/** Types of elements found in htmlparser2's DOM */

var ElementType;

(function (ElementType) {
  /** Type for the root element of a document */
  ElementType["Root"] = "root";
  /** Type for Text */

  ElementType["Text"] = "text";
  /** Type for <? ... ?> */

  ElementType["Directive"] = "directive";
  /** Type for <!-- ... --> */

  ElementType["Comment"] = "comment";
  /** Type for <script> tags */

  ElementType["Script"] = "script";
  /** Type for <style> tags */

  ElementType["Style"] = "style";
  /** Type for Any tag */

  ElementType["Tag"] = "tag";
  /** Type for <![CDATA[ ... ]]> */

  ElementType["CDATA"] = "cdata";
  /** Type for <!doctype ...> */

  ElementType["Doctype"] = "doctype";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */


function isTag(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}

exports.isTag = isTag; // Exports for backwards compatibility

/** Type for the root element of a document */

exports.Root = ElementType.Root;
/** Type for Text */

exports.Text = ElementType.Text;
/** Type for <? ... ?> */

exports.Directive = ElementType.Directive;
/** Type for <!-- ... --> */

exports.Comment = ElementType.Comment;
/** Type for <script> tags */

exports.Script = ElementType.Script;
/** Type for <style> tags */

exports.Style = ElementType.Style;
/** Type for Any tag */

exports.Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */

exports.CDATA = ElementType.CDATA;
/** Type for <!doctype ...> */

exports.Doctype = ElementType.Doctype;

/***/ }),

/***/ "./node_modules/domhandler/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/domhandler/lib/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DomHandler = void 0;

var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");

var node_js_1 = __webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js");

__exportStar(__webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js"), exports); // Default options


var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};

var DomHandler =
/** @class */
function () {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  function DomHandler(callback, options, elementCB) {
    /** The elements of the DOM */
    this.dom = [];
    /** The root element for the DOM */

    this.root = new node_js_1.Document(this.dom);
    /** Indicated whether parsing has been completed. */

    this.done = false;
    /** Stack of open tags. */

    this.tagStack = [this.root];
    /** A data node that is still being written to. */

    this.lastNode = null;
    /** Reference to the parser instance. Used for location information. */

    this.parser = null; // Make it possible to skip arguments, for backwards-compatibility

    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }

    if (typeof callback === "object") {
      options = callback;
      callback = undefined;
    }

    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options !== null && options !== void 0 ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }

  DomHandler.prototype.onparserinit = function (parser) {
    this.parser = parser;
  }; // Resets the handler back to starting state


  DomHandler.prototype.onreset = function () {
    this.dom = [];
    this.root = new node_js_1.Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }; // Signals the handler that parsing is done


  DomHandler.prototype.onend = function () {
    if (this.done) return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  };

  DomHandler.prototype.onerror = function (error) {
    this.handleCallback(error);
  };

  DomHandler.prototype.onclosetag = function () {
    this.lastNode = null;
    var elem = this.tagStack.pop();

    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }

    if (this.elementCB) this.elementCB(elem);
  };

  DomHandler.prototype.onopentag = function (name, attribs) {
    var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
    var element = new node_js_1.Element(name, attribs, undefined, type);
    this.addNode(element);
    this.tagStack.push(element);
  };

  DomHandler.prototype.ontext = function (data) {
    var lastNode = this.lastNode;

    if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
      lastNode.data += data;

      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      var node = new node_js_1.Text(data);
      this.addNode(node);
      this.lastNode = node;
    }
  };

  DomHandler.prototype.oncomment = function (data) {
    if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }

    var node = new node_js_1.Comment(data);
    this.addNode(node);
    this.lastNode = node;
  };

  DomHandler.prototype.oncommentend = function () {
    this.lastNode = null;
  };

  DomHandler.prototype.oncdatastart = function () {
    var text = new node_js_1.Text("");
    var node = new node_js_1.CDATA([text]);
    this.addNode(node);
    text.parent = node;
    this.lastNode = text;
  };

  DomHandler.prototype.oncdataend = function () {
    this.lastNode = null;
  };

  DomHandler.prototype.onprocessinginstruction = function (name, data) {
    var node = new node_js_1.ProcessingInstruction(name, data);
    this.addNode(node);
  };

  DomHandler.prototype.handleCallback = function (error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  };

  DomHandler.prototype.addNode = function (node) {
    var parent = this.tagStack[this.tagStack.length - 1];
    var previousSibling = parent.children[parent.children.length - 1];

    if (this.options.withStartIndices) {
      node.startIndex = this.parser.startIndex;
    }

    if (this.options.withEndIndices) {
      node.endIndex = this.parser.endIndex;
    }

    parent.children.push(node);

    if (previousSibling) {
      node.prev = previousSibling;
      previousSibling.next = node;
    }

    node.parent = parent;
    this.lastNode = null;
  };

  return DomHandler;
}();

exports.DomHandler = DomHandler;
exports["default"] = DomHandler;

/***/ }),

/***/ "./node_modules/domhandler/lib/node.js":
/*!*********************************************!*\
  !*** ./node_modules/domhandler/lib/node.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.cloneNode = exports.hasChildren = exports.isDocument = exports.isDirective = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = exports.Element = exports.Document = exports.CDATA = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;

var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
/**
 * This object will be used as the prototype for Nodes when creating a
 * DOM-Level-1-compliant structure.
 */


var Node =
/** @class */
function () {
  function Node() {
    /** Parent of the node */
    this.parent = null;
    /** Previous sibling */

    this.prev = null;
    /** Next sibling */

    this.next = null;
    /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */

    this.startIndex = null;
    /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */

    this.endIndex = null;
  }

  Object.defineProperty(Node.prototype, "parentNode", {
    // Read-write aliases for properties

    /**
     * Same as {@link parent}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.parent;
    },
    set: function (parent) {
      this.parent = parent;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "previousSibling", {
    /**
     * Same as {@link prev}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.prev;
    },
    set: function (prev) {
      this.prev = prev;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "nextSibling", {
    /**
     * Same as {@link next}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.next;
    },
    set: function (next) {
      this.next = next;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */

  Node.prototype.cloneNode = function (recursive) {
    if (recursive === void 0) {
      recursive = false;
    }

    return cloneNode(this, recursive);
  };

  return Node;
}();

exports.Node = Node;
/**
 * A node that contains some data.
 */

var DataNode =
/** @class */
function (_super) {
  __extends(DataNode, _super);
  /**
   * @param data The content of the data node
   */


  function DataNode(data) {
    var _this = _super.call(this) || this;

    _this.data = data;
    return _this;
  }

  Object.defineProperty(DataNode.prototype, "nodeValue", {
    /**
     * Same as {@link data}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.data;
    },
    set: function (data) {
      this.data = data;
    },
    enumerable: false,
    configurable: true
  });
  return DataNode;
}(Node);

exports.DataNode = DataNode;
/**
 * Text within the document.
 */

var Text =
/** @class */
function (_super) {
  __extends(Text, _super);

  function Text() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = domelementtype_1.ElementType.Text;
    return _this;
  }

  Object.defineProperty(Text.prototype, "nodeType", {
    get: function () {
      return 3;
    },
    enumerable: false,
    configurable: true
  });
  return Text;
}(DataNode);

exports.Text = Text;
/**
 * Comments within the document.
 */

var Comment =
/** @class */
function (_super) {
  __extends(Comment, _super);

  function Comment() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = domelementtype_1.ElementType.Comment;
    return _this;
  }

  Object.defineProperty(Comment.prototype, "nodeType", {
    get: function () {
      return 8;
    },
    enumerable: false,
    configurable: true
  });
  return Comment;
}(DataNode);

exports.Comment = Comment;
/**
 * Processing instructions, including doc types.
 */

var ProcessingInstruction =
/** @class */
function (_super) {
  __extends(ProcessingInstruction, _super);

  function ProcessingInstruction(name, data) {
    var _this = _super.call(this, data) || this;

    _this.name = name;
    _this.type = domelementtype_1.ElementType.Directive;
    return _this;
  }

  Object.defineProperty(ProcessingInstruction.prototype, "nodeType", {
    get: function () {
      return 1;
    },
    enumerable: false,
    configurable: true
  });
  return ProcessingInstruction;
}(DataNode);

exports.ProcessingInstruction = ProcessingInstruction;
/**
 * A `Node` that can have children.
 */

var NodeWithChildren =
/** @class */
function (_super) {
  __extends(NodeWithChildren, _super);
  /**
   * @param children Children of the node. Only certain node types can have children.
   */


  function NodeWithChildren(children) {
    var _this = _super.call(this) || this;

    _this.children = children;
    return _this;
  }

  Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
    // Aliases

    /** First child of the node. */
    get: function () {
      var _a;

      return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
    /** Last child of the node. */
    get: function () {
      return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
    /**
     * Same as {@link children}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.children;
    },
    set: function (children) {
      this.children = children;
    },
    enumerable: false,
    configurable: true
  });
  return NodeWithChildren;
}(Node);

exports.NodeWithChildren = NodeWithChildren;

var CDATA =
/** @class */
function (_super) {
  __extends(CDATA, _super);

  function CDATA() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = domelementtype_1.ElementType.CDATA;
    return _this;
  }

  Object.defineProperty(CDATA.prototype, "nodeType", {
    get: function () {
      return 4;
    },
    enumerable: false,
    configurable: true
  });
  return CDATA;
}(NodeWithChildren);

exports.CDATA = CDATA;
/**
 * The root node of the document.
 */

var Document =
/** @class */
function (_super) {
  __extends(Document, _super);

  function Document() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = domelementtype_1.ElementType.Root;
    return _this;
  }

  Object.defineProperty(Document.prototype, "nodeType", {
    get: function () {
      return 9;
    },
    enumerable: false,
    configurable: true
  });
  return Document;
}(NodeWithChildren);

exports.Document = Document;
/**
 * An element within the DOM.
 */

var Element =
/** @class */
function (_super) {
  __extends(Element, _super);
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */


  function Element(name, attribs, children, type) {
    if (children === void 0) {
      children = [];
    }

    if (type === void 0) {
      type = name === "script" ? domelementtype_1.ElementType.Script : name === "style" ? domelementtype_1.ElementType.Style : domelementtype_1.ElementType.Tag;
    }

    var _this = _super.call(this, children) || this;

    _this.name = name;
    _this.attribs = attribs;
    _this.type = type;
    return _this;
  }

  Object.defineProperty(Element.prototype, "nodeType", {
    get: function () {
      return 1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Element.prototype, "tagName", {
    // DOM Level 1 aliases

    /**
     * Same as {@link name}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get: function () {
      return this.name;
    },
    set: function (name) {
      this.name = name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Element.prototype, "attributes", {
    get: function () {
      var _this = this;

      return Object.keys(this.attribs).map(function (name) {
        var _a, _b;

        return {
          name: name,
          value: _this.attribs[name],
          namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
          prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
        };
      });
    },
    enumerable: false,
    configurable: true
  });
  return Element;
}(NodeWithChildren);

exports.Element = Element;
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */

function isTag(node) {
  return (0, domelementtype_1.isTag)(node);
}

exports.isTag = isTag;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */

function isCDATA(node) {
  return node.type === domelementtype_1.ElementType.CDATA;
}

exports.isCDATA = isCDATA;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */

function isText(node) {
  return node.type === domelementtype_1.ElementType.Text;
}

exports.isText = isText;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */

function isComment(node) {
  return node.type === domelementtype_1.ElementType.Comment;
}

exports.isComment = isComment;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */

function isDirective(node) {
  return node.type === domelementtype_1.ElementType.Directive;
}

exports.isDirective = isDirective;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */

function isDocument(node) {
  return node.type === domelementtype_1.ElementType.Root;
}

exports.isDocument = isDocument;
/**
 * @param node Node to check.
 * @returns `true` if the node has children, `false` otherwise.
 */

function hasChildren(node) {
  return Object.prototype.hasOwnProperty.call(node, "children");
}

exports.hasChildren = hasChildren;
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */

function cloneNode(node, recursive) {
  if (recursive === void 0) {
    recursive = false;
  }

  var result;

  if (isText(node)) {
    result = new Text(node.data);
  } else if (isComment(node)) {
    result = new Comment(node.data);
  } else if (isTag(node)) {
    var children = recursive ? cloneChildren(node.children) : [];
    var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
    children.forEach(function (child) {
      return child.parent = clone_1;
    });

    if (node.namespace != null) {
      clone_1.namespace = node.namespace;
    }

    if (node["x-attribsNamespace"]) {
      clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
    }

    if (node["x-attribsPrefix"]) {
      clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
    }

    result = clone_1;
  } else if (isCDATA(node)) {
    var children = recursive ? cloneChildren(node.children) : [];
    var clone_2 = new CDATA(children);
    children.forEach(function (child) {
      return child.parent = clone_2;
    });
    result = clone_2;
  } else if (isDocument(node)) {
    var children = recursive ? cloneChildren(node.children) : [];
    var clone_3 = new Document(children);
    children.forEach(function (child) {
      return child.parent = clone_3;
    });

    if (node["x-mode"]) {
      clone_3["x-mode"] = node["x-mode"];
    }

    result = clone_3;
  } else if (isDirective(node)) {
    var instruction = new ProcessingInstruction(node.name, node.data);

    if (node["x-name"] != null) {
      instruction["x-name"] = node["x-name"];
      instruction["x-publicId"] = node["x-publicId"];
      instruction["x-systemId"] = node["x-systemId"];
    }

    result = instruction;
  } else {
    throw new Error("Not implemented yet: ".concat(node.type));
  }

  result.startIndex = node.startIndex;
  result.endIndex = node.endIndex;

  if (node.sourceCodeLocation != null) {
    result.sourceCodeLocation = node.sourceCodeLocation;
  }

  return result;
}

exports.cloneNode = cloneNode;

function cloneChildren(childs) {
  var children = childs.map(function (child) {
    return cloneNode(child, true);
  });

  for (var i = 1; i < children.length; i++) {
    children[i].prev = children[i - 1];
    children[i - 1].next = children[i];
  }

  return children;
}

/***/ }),

/***/ "./node_modules/html-dom-parser/lib/client/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/client/constants.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * SVG elements are case-sensitive.
 *
 * @see {@link https://developer.mozilla.org/docs/Web/SVG/Element#svg_elements_a_to_z}
 */
exports.CASE_SENSITIVE_TAG_NAMES = ['animateMotion', 'animateTransform', 'clipPath', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'foreignObject', 'linearGradient', 'radialGradient', 'textPath'];

/***/ }),

/***/ "./node_modules/html-dom-parser/lib/client/domparser.js":
/*!**************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/client/domparser.js ***!
  \**************************************************************/
/***/ ((module) => {

// constants
var HTML = 'html';
var HEAD = 'head';
var BODY = 'body';
var FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>
// match-all-characters in case of newlines (DOTALL)

var HEAD_TAG_REGEX = /<head[^]*>/i;
var BODY_TAG_REGEX = /<body[^]*>/i; // falls back to `parseFromString` if `createHTMLDocument` cannot be used

var parseFromDocument = function () {
  throw new Error('This browser does not support `document.implementation.createHTMLDocument`');
};

var parseFromString = function () {
  throw new Error('This browser does not support `DOMParser.prototype.parseFromString`');
};

var DOMParser = typeof window === 'object' && window.DOMParser;
/**
 * DOMParser (performance: slow).
 *
 * @see https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
 */

if (typeof DOMParser === 'function') {
  var domParser = new DOMParser();
  var mimeType = 'text/html';
  /**
   * Creates an HTML document using `DOMParser.parseFromString`.
   *
   * @param  {string} html      - The HTML string.
   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
   * @return {HTMLDocument}
   */

  parseFromString = function (html, tagName) {
    if (tagName) {
      html = '<' + tagName + '>' + html + '</' + tagName + '>';
    }

    return domParser.parseFromString(html, mimeType);
  };

  parseFromDocument = parseFromString;
}
/**
 * DOMImplementation (performance: fair).
 *
 * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
 */


if (typeof document === 'object' && document.implementation) {
  var doc = document.implementation.createHTMLDocument();
  /**
   * Use HTML document created by `document.implementation.createHTMLDocument`.
   *
   * @param  {string} html      - The HTML string.
   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
   * @return {HTMLDocument}
   */

  parseFromDocument = function (html, tagName) {
    if (tagName) {
      var element = doc.documentElement.querySelector(tagName);
      element.innerHTML = html;
      return doc;
    }

    doc.documentElement.innerHTML = html;
    return doc;
  };
}
/**
 * Template (performance: fast).
 *
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
 */


var template = typeof document === 'object' ? document.createElement('template') : {};
var parseFromTemplate;

if (template.content) {
  /**
   * Uses a template element (content fragment) to parse HTML.
   *
   * @param  {string} html - The HTML string.
   * @return {NodeList}
   */
  parseFromTemplate = function (html) {
    template.innerHTML = html;
    return template.content.childNodes;
  };
}
/**
 * Parses HTML string to DOM nodes.
 *
 * @param  {string}   html - HTML markup.
 * @return {NodeList}
 */


function domparser(html) {
  var firstTagName;
  var match = html.match(FIRST_TAG_REGEX);

  if (match && match[1]) {
    firstTagName = match[1].toLowerCase();
  }

  var doc;
  var element;
  var elements;

  switch (firstTagName) {
    case HTML:
      doc = parseFromString(html); // the created document may come with filler head/body elements,
      // so make sure to remove them if they don't actually exist

      if (!HEAD_TAG_REGEX.test(html)) {
        element = doc.querySelector(HEAD);

        if (element) {
          element.parentNode.removeChild(element);
        }
      }

      if (!BODY_TAG_REGEX.test(html)) {
        element = doc.querySelector(BODY);

        if (element) {
          element.parentNode.removeChild(element);
        }
      }

      return doc.querySelectorAll(HTML);

    case HEAD:
    case BODY:
      doc = parseFromDocument(html);
      elements = doc.querySelectorAll(firstTagName); // if there's a sibling element, then return both elements

      if (BODY_TAG_REGEX.test(html) && HEAD_TAG_REGEX.test(html)) {
        return elements[0].parentNode.childNodes;
      }

      return elements;
    // low-level tag or text

    default:
      if (parseFromTemplate) {
        return parseFromTemplate(html);
      }

      element = parseFromDocument(html, BODY).querySelector(BODY);
      return element.childNodes;
  }
}

module.exports = domparser;

/***/ }),

/***/ "./node_modules/html-dom-parser/lib/client/html-to-dom.js":
/*!****************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/client/html-to-dom.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var domparser = __webpack_require__(/*! ./domparser */ "./node_modules/html-dom-parser/lib/client/domparser.js");

var utilities = __webpack_require__(/*! ./utilities */ "./node_modules/html-dom-parser/lib/client/utilities.js");

var formatDOM = utilities.formatDOM;
var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param  {string} html  - HTML markup.
 * @return {DomElement[]} - DOM elements.
 */

function HTMLDOMParser(html) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (html === '') {
    return [];
  } // match directive


  var match = html.match(DIRECTIVE_REGEX);
  var directive;

  if (match && match[1]) {
    directive = match[1];
  }

  return formatDOM(domparser(html), null, directive);
}

module.exports = HTMLDOMParser;

/***/ }),

/***/ "./node_modules/html-dom-parser/lib/client/utilities.js":
/*!**************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/client/utilities.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var domhandler = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");

var constants = __webpack_require__(/*! ./constants */ "./node_modules/html-dom-parser/lib/client/constants.js");

var CASE_SENSITIVE_TAG_NAMES = constants.CASE_SENSITIVE_TAG_NAMES;
var Comment = domhandler.Comment;
var Element = domhandler.Element;
var ProcessingInstruction = domhandler.ProcessingInstruction;
var Text = domhandler.Text;
var caseSensitiveTagNamesMap = {};
var tagName;

for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
  tagName = CASE_SENSITIVE_TAG_NAMES[i];
  caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
}
/**
 * Gets case-sensitive tag name.
 *
 * @param {string} tagName - Tag name in lowercase.
 * @returns {string|undefined} - Case-sensitive tag name.
 */


function getCaseSensitiveTagName(tagName) {
  return caseSensitiveTagNamesMap[tagName];
}
/**
 * Formats DOM attributes to a hash map.
 *
 * @param {NamedNodeMap} attributes - List of attributes.
 * @returns {object} - Map of attribute name to value.
 */


function formatAttributes(attributes) {
  var result = {};
  var attribute; // `NamedNodeMap` is array-like

  for (var i = 0, len = attributes.length; i < len; i++) {
    attribute = attributes[i];
    result[attribute.name] = attribute.value;
  }

  return result;
}
/**
 * Corrects the tag name if it is case-sensitive (SVG).
 * Otherwise, returns the lowercase tag name (HTML).
 *
 * @param {string} tagName - Lowercase tag name.
 * @returns {string} - Formatted tag name.
 */


function formatTagName(tagName) {
  tagName = tagName.toLowerCase();
  var caseSensitiveTagName = getCaseSensitiveTagName(tagName);

  if (caseSensitiveTagName) {
    return caseSensitiveTagName;
  }

  return tagName;
}
/**
 * Transforms DOM nodes to `domhandler` nodes.
 *
 * @param {NodeList} nodes - DOM nodes.
 * @param {Element|null} [parent=null] - Parent node.
 * @param {string} [directive] - Directive.
 * @returns {Array<Comment|Element|ProcessingInstruction|Text>}
 */


function formatDOM(nodes, parent, directive) {
  parent = parent || null;
  var result = [];
  var tagName;

  for (var index = 0, len = nodes.length; index < len; index++) {
    var node = nodes[index];
    var current; // set the node data given the type

    switch (node.nodeType) {
      case 1:
        tagName = formatTagName(node.nodeName); // script, style, or tag

        current = new Element(tagName, formatAttributes(node.attributes));
        current.children = formatDOM( // template children are on content
        tagName === 'template' ? node.content.childNodes : node.childNodes, current);
        break;

      case 3:
        current = new Text(node.nodeValue);
        break;

      case 8:
        current = new Comment(node.nodeValue);
        break;

      default:
        continue;
    } // set previous node next


    var prev = result[index - 1] || null;

    if (prev) {
      prev.next = current;
    } // set properties for current node


    current.parent = parent;
    current.prev = prev;
    current.next = null;
    result.push(current);
  }

  if (directive) {
    current = new ProcessingInstruction(directive.substring(0, directive.indexOf(' ')).toLowerCase(), directive);
    current.next = result[0] || null;
    current.parent = parent;
    result.unshift(current);

    if (result[1]) {
      result[1].prev = result[0];
    }
  }

  return result;
}

exports.formatAttributes = formatAttributes;
exports.formatDOM = formatDOM;

/***/ }),

/***/ "./node_modules/html-react-parser/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-react-parser/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var domhandler = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");

var htmlToDOM = __webpack_require__(/*! html-dom-parser */ "./node_modules/html-dom-parser/lib/client/html-to-dom.js");

var attributesToProps = __webpack_require__(/*! ./lib/attributes-to-props */ "./node_modules/html-react-parser/lib/attributes-to-props.js");

var domToReact = __webpack_require__(/*! ./lib/dom-to-react */ "./node_modules/html-react-parser/lib/dom-to-react.js"); // support backwards compatibility for ES Module


htmlToDOM =
/* istanbul ignore next */
typeof htmlToDOM.default === 'function' ? htmlToDOM.default : htmlToDOM;
var domParserOptions = {
  lowerCaseAttributeNames: false
};
/**
 * Converts HTML string to React elements.
 *
 * @param {string} html - HTML string.
 * @param {object} [options] - Parser options.
 * @param {object} [options.htmlparser2] - htmlparser2 options.
 * @param {object} [options.library] - Library for React, Preact, etc.
 * @param {Function} [options.replace] - Replace method.
 * @returns {JSX.Element|JSX.Element[]|string} - React element(s), empty array, or string.
 */

function HTMLReactParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (html === '') {
    return [];
  }

  options = options || {};
  return domToReact(htmlToDOM(html, options.htmlparser2 || domParserOptions), options);
}

HTMLReactParser.domToReact = domToReact;
HTMLReactParser.htmlToDOM = htmlToDOM;
HTMLReactParser.attributesToProps = attributesToProps; // domhandler

HTMLReactParser.Comment = domhandler.Comment;
HTMLReactParser.Element = domhandler.Element;
HTMLReactParser.ProcessingInstruction = domhandler.ProcessingInstruction;
HTMLReactParser.Text = domhandler.Text; // support CommonJS and ES Modules

module.exports = HTMLReactParser;
HTMLReactParser.default = HTMLReactParser;

/***/ }),

/***/ "./node_modules/html-react-parser/lib/attributes-to-props.js":
/*!*******************************************************************!*\
  !*** ./node_modules/html-react-parser/lib/attributes-to-props.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var reactProperty = __webpack_require__(/*! react-property */ "./node_modules/react-property/lib/index.js");

var utilities = __webpack_require__(/*! ./utilities */ "./node_modules/html-react-parser/lib/utilities.js"); // https://reactjs.org/docs/uncontrolled-components.html
// https://developer.mozilla.org/docs/Web/HTML/Attributes


var UNCONTROLLED_COMPONENT_ATTRIBUTES = ['checked', 'value'];
var UNCONTROLLED_COMPONENT_NAMES = ['input', 'select', 'textarea'];
var VALUE_ONLY_INPUTS = {
  reset: true,
  submit: true
};
/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param {object} [attributes={}] - HTML/SVG DOM attributes.
 * @param {string} [nodeName] - DOM node name.
 * @returns - React props.
 */

module.exports = function attributesToProps(attributes, nodeName) {
  attributes = attributes || {};
  var attributeName;
  var attributeNameLowerCased;
  var attributeValue;
  var propName;
  var propertyInfo;
  var props = {};
  var inputIsValueOnly = attributes.type && VALUE_ONLY_INPUTS[attributes.type];

  for (attributeName in attributes) {
    attributeValue = attributes[attributeName]; // ARIA (aria-*) or custom data (data-*) attribute

    if (reactProperty.isCustomAttribute(attributeName)) {
      props[attributeName] = attributeValue;
      continue;
    } // convert HTML/SVG attribute to React prop


    attributeNameLowerCased = attributeName.toLowerCase();
    propName = getPropName(attributeNameLowerCased);

    if (propName) {
      propertyInfo = reactProperty.getPropertyInfo(propName); // convert attribute to uncontrolled component prop (e.g., `value` to `defaultValue`)

      if (UNCONTROLLED_COMPONENT_ATTRIBUTES.indexOf(propName) !== -1 && UNCONTROLLED_COMPONENT_NAMES.indexOf(nodeName) !== -1 && !inputIsValueOnly) {
        propName = getPropName('default' + attributeNameLowerCased);
      }

      props[propName] = attributeValue;

      switch (propertyInfo && propertyInfo.type) {
        case reactProperty.BOOLEAN:
          props[propName] = true;
          break;

        case reactProperty.OVERLOADED_BOOLEAN:
          if (attributeValue === '') {
            props[propName] = true;
          }

          break;
      }

      continue;
    } // preserve custom attribute if React >=16


    if (utilities.PRESERVE_CUSTOM_ATTRIBUTES) {
      props[attributeName] = attributeValue;
    }
  } // transform inline style to object


  utilities.setStyleProp(attributes.style, props);
  return props;
};
/**
 * Gets prop name from lowercased attribute name.
 *
 * @param {string} attributeName - Lowercased attribute name.
 * @returns - Prop name.
 */


function getPropName(attributeName) {
  return reactProperty.possibleStandardNames[attributeName];
}

/***/ }),

/***/ "./node_modules/html-react-parser/lib/dom-to-react.js":
/*!************************************************************!*\
  !*** ./node_modules/html-react-parser/lib/dom-to-react.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

var attributesToProps = __webpack_require__(/*! ./attributes-to-props */ "./node_modules/html-react-parser/lib/attributes-to-props.js");

var utilities = __webpack_require__(/*! ./utilities */ "./node_modules/html-react-parser/lib/utilities.js");

var setStyleProp = utilities.setStyleProp;
var canTextBeChildOfNode = utilities.canTextBeChildOfNode;
/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param {DomElement[]} nodes - DOM nodes.
 * @param {object} [options={}] - Options.
 * @param {Function} [options.replace] - Replacer.
 * @param {Function} [options.transform] - Transform.
 * @param {object} [options.library] - Library (React, Preact, etc.).
 * @returns - String or JSX element(s).
 */

function domToReact(nodes, options) {
  options = options || {};
  var library = options.library || React;
  var cloneElement = library.cloneElement;
  var createElement = library.createElement;
  var isValidElement = library.isValidElement;
  var result = [];
  var node;
  var isWhitespace;
  var hasReplace = typeof options.replace === 'function';
  var transform = options.transform || utilities.returnFirstArg;
  var replaceElement;
  var props;
  var children;
  var trim = options.trim;

  for (var i = 0, len = nodes.length; i < len; i++) {
    node = nodes[i]; // replace with custom React element (if present)

    if (hasReplace) {
      replaceElement = options.replace(node);

      if (isValidElement(replaceElement)) {
        // set "key" prop for sibling elements
        // https://fb.me/react-warning-keys
        if (len > 1) {
          replaceElement = cloneElement(replaceElement, {
            key: replaceElement.key || i
          });
        }

        result.push(transform(replaceElement, node, i));
        continue;
      }
    }

    if (node.type === 'text') {
      isWhitespace = !node.data.trim().length;

      if (isWhitespace && node.parent && !canTextBeChildOfNode(node.parent)) {
        // We have a whitespace node that can't be nested in its parent
        // so skip it
        continue;
      }

      if (trim && isWhitespace) {
        // Trim is enabled and we have a whitespace node
        // so skip it
        continue;
      } // We have a text node that's not whitespace and it can be nested
      // in its parent so add it to the results


      result.push(transform(node.data, node, i));
      continue;
    }

    props = node.attribs;

    if (skipAttributesToProps(node)) {
      setStyleProp(props.style, props);
    } else if (props) {
      props = attributesToProps(props, node.name);
    }

    children = null;

    switch (node.type) {
      case 'script':
      case 'style':
        // prevent text in <script> or <style> from being escaped
        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        if (node.children[0]) {
          props.dangerouslySetInnerHTML = {
            __html: node.children[0].data
          };
        }

        break;

      case 'tag':
        // setting textarea value in children is an antipattern in React
        // https://reactjs.org/docs/forms.html#the-textarea-tag
        if (node.name === 'textarea' && node.children[0]) {
          props.defaultValue = node.children[0].data;
        } else if (node.children && node.children.length) {
          // continue recursion of creating React elements (if applicable)
          children = domToReact(node.children, options);
        }

        break;
      // skip all other cases (e.g., comment)

      default:
        continue;
    } // set "key" prop for sibling elements
    // https://fb.me/react-warning-keys


    if (len > 1) {
      props.key = i;
    }

    result.push(transform(createElement(node.name, props, children), node, i));
  }

  return result.length === 1 ? result[0] : result;
}
/**
 * Determines whether DOM element attributes should be transformed to props.
 * Web Components should not have their attributes transformed except for `style`.
 *
 * @param {DomElement} node
 * @returns - Whether node attributes should be converted to props.
 */


function skipAttributesToProps(node) {
  return utilities.PRESERVE_CUSTOM_ATTRIBUTES && node.type === 'tag' && utilities.isCustomComponent(node.name, node.attribs);
}

module.exports = domToReact;

/***/ }),

/***/ "./node_modules/html-react-parser/lib/utilities.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-react-parser/lib/utilities.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

var styleToJS = (__webpack_require__(/*! style-to-js */ "./node_modules/style-to-js/cjs/index.js")["default"]);
/**
 * Swap key with value in an object.
 *
 * @param {object} obj - The object.
 * @param {Function} [override] - The override method.
 * @returns - The inverted object.
 */


function invertObject(obj, override) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('First argument must be an object');
  }

  var isOverridePresent = typeof override === 'function';
  var overrides = {};
  var result = {};

  for (var key in obj) {
    var value = obj[key];

    if (isOverridePresent) {
      overrides = override(key, value);

      if (overrides && overrides.length === 2) {
        result[overrides[0]] = overrides[1];
        continue;
      }
    }

    if (typeof value === 'string') {
      result[value] = key;
    }
  }

  return result;
}
/**
 * Check if a given tag is a custom component.
 *
 * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
 *
 * @param {string} tagName - The name of the html tag.
 * @param {object} props - The props being passed to the element.
 * @returns - Whether tag is custom component.
 */


var RESERVED_SVG_MATHML_ELEMENTS = new Set(['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph']);

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return props && typeof props.is === 'string';
  } // These are reserved SVG and MathML elements.
  // We don't mind this whitelist too much because we expect it to never grow.
  // The alternative is to track the namespace in a few places which is convoluted.
  // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts


  if (RESERVED_SVG_MATHML_ELEMENTS.has(tagName)) {
    return false;
  }

  return true;
} // styleToJSOptions


var STYLE_TO_JS_OPTIONS = {
  reactCompat: true
};
/**
 * Sets style prop.
 *
 * @param {null|undefined|string} style
 * @param {object} props
 */

function setStyleProp(style, props) {
  if (style === null || style === undefined) {
    return;
  }

  try {
    props.style = styleToJS(style, STYLE_TO_JS_OPTIONS);
  } catch (err) {
    props.style = {};
  }
}
/**
 * @constant {boolean}
 * @see {@link https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html}
 */


var PRESERVE_CUSTOM_ATTRIBUTES = React.version.split('.')[0] >= 16; // Taken from
// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-dom/src/client/validateDOMNesting.js#L213

var ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set(['tr', 'tbody', 'thead', 'tfoot', 'colgroup', 'table', 'head', 'html', 'frameset']);
/**
 * Checks if the given node can contain text nodes
 *
 * @param {DomElement} node - Node.
 * @returns - Whether node can contain text nodes.
 */

function canTextBeChildOfNode(node) {
  return !ELEMENTS_WITH_NO_TEXT_CHILDREN.has(node.name);
}

function returnFirstArg(arg) {
  return arg;
}

module.exports = {
  PRESERVE_CUSTOM_ATTRIBUTES: PRESERVE_CUSTOM_ATTRIBUTES,
  ELEMENTS_WITH_NO_TEXT_CHILDREN: ELEMENTS_WITH_NO_TEXT_CHILDREN,
  invertObject: invertObject,
  isCustomComponent: isCustomComponent,
  setStyleProp: setStyleProp,
  canTextBeChildOfNode: canTextBeChildOfNode,
  returnFirstArg: returnFirstArg
};

/***/ }),

/***/ "./node_modules/inline-style-parser/index.js":
/*!***************************************************!*\
  !*** ./node_modules/inline-style-parser/index.js ***!
  \***************************************************/
/***/ ((module) => {

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/; // declaration

var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/; // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

var TRIM_REGEX = /^\s+|\s+$/g; // strings

var NEWLINE = '\n';
var FORWARD_SLASH = '/';
var ASTERISK = '*';
var EMPTY_STRING = ''; // types

var TYPE_COMMENT = 'comment';
var TYPE_DECLARATION = 'declaration';
/**
 * @param {String} style
 * @param {Object} [options]
 * @return {Object[]}
 * @throws {TypeError}
 * @throws {Error}
 */

module.exports = function (style, options) {
  if (typeof style !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!style) return [];
  options = options || {};
  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;
  /**
   * Update lineno and column based on `str`.
   *
   * @param {String} str
   */

  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  /**
   * Mark position and patch `node.position`.
   *
   * @return {Function}
   */


  function position() {
    var start = {
      line: lineno,
      column: column
    };
    return function (node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }
  /**
   * Store position information for a node.
   *
   * @constructor
   * @property {Object} start
   * @property {Object} end
   * @property {undefined|String} source
   */


  function Position(start) {
    this.start = start;
    this.end = {
      line: lineno,
      column: column
    };
    this.source = options.source;
  }
  /**
   * Non-enumerable source string.
   */


  Position.prototype.content = style;
  var errorsList = [];
  /**
   * Error `msg`.
   *
   * @param {String} msg
   * @throws {Error}
   */

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }
  /**
   * Match `re` and return captures.
   *
   * @param {RegExp} re
   * @return {undefined|Array}
   */


  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }
  /**
   * Parse whitespace.
   */


  function whitespace() {
    match(WHITESPACE_REGEX);
  }
  /**
   * Parse comments.
   *
   * @param {Object[]} [rules]
   * @return {Object[]}
   */


  function comments(rules) {
    var c;
    rules = rules || [];

    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }

    return rules;
  }
  /**
   * Parse comment.
   *
   * @return {Object}
   * @throws {Error}
   */


  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
    var i = 2;

    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }

    i += 2;

    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error('End of comment missing');
    }

    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  /**
   * Parse declaration.
   *
   * @return {Object}
   * @throws {Error}
   */


  function declaration() {
    var pos = position(); // prop

    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment(); // :

    if (!match(COLON_REGEX)) return error("property missing ':'"); // val

    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    }); // ;

    match(SEMICOLON_REGEX);
    return ret;
  }
  /**
   * Parse declarations.
   *
   * @return {Object[]}
   */


  function declarations() {
    var decls = [];
    comments(decls); // declarations

    var decl;

    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    return decls;
  }

  whitespace();
  return declarations();
};
/**
 * Trim `str`.
 *
 * @param {String} str
 * @return {String}
 */


function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}

/***/ }),

/***/ "./node_modules/lodash/lodash.js":
/***/ ((module) => {

// Replaced at build time by muiPersonalWebsite. The original module is the whole of lodash,
// 481 KB of it, imported by src/react/adapters.js for the two names below - which it
// re-exports and never calls. A statically built page has no Shiny inputs on it and never
// reaches them either. Implemented rather than stubbed, so that anything which does reach
// them gets a working function rather than a silent no-op.
function debounce(fn, wait, options) {
  wait = wait || 0;
  var leading = !!(options && options.leading);
  var trailing = !options || options.trailing !== false;
  var timer = null, lastArgs = null, lastThis = null, result;
  function invoke() {
    timer = null;
    if (trailing && lastArgs) {
      result = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
  }
  function debounced() {
    lastArgs = arguments;
    lastThis = this;
    var first = timer === null;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(invoke, wait);
    if (first && leading) {
      result = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
    return result;
  }
  debounced.cancel = function () {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    lastArgs = lastThis = null;
  };
  debounced.flush = function () {
    if (timer !== null) invoke();
    return result;
  };
  return debounced;
}

function throttle(fn, wait, options) {
  var leading = !options || options.leading !== false;
  var trailing = !options || options.trailing !== false;
  return debounce(fn, wait, { leading: leading, trailing: trailing });
}

module.exports = { debounce: debounce, throttle: throttle };

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var printWarning = function () {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");

  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  if (true) {
    loggedTypeFailures = {};
  }
};

module.exports = checkPropTypes;

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");

var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function () {};

if (true) {
  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = typeof propValue;

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js"); // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod


  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");

if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  exports.createRoot = function (c, o) {
    i.usingClientEntryPoint = true;

    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };

  exports.hydrateRoot = function (c, h, o) {
    i.usingClientEntryPoint = true;

    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
  })();
}

/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}

/***/ }),

/***/ "./node_modules/react-property/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-property/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
} // A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.


var RESERVED = 0; // A simple string attribute.
// Attributes that aren't in the filter are presumed to have this type.

var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.

var BOOLEANISH_STRING = 2; // A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.

var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.

var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.

var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.

var POSITIVE_NUMERIC = 6;

function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString;
} // When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.


var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];
reservedProps.forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.

[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      attributeName = _ref2[1];

  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).

['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.

['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML boolean attributes.

['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
'itemScope'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.

['checked', // Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.

['capture', 'download' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that must be positive numbers.

['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that must be numbers.

['rowSpan', 'start'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
});
var CAMELIZE = /[\-\:]([a-z])/g;

var capitalize = function capitalize(token) {
  return token[1].toUpperCase();
}; // This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML attribute filter.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.


['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // String SVG attributes with the xlink namespace.

['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
  false);
}); // String SVG attributes with the xml namespace.

['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
  false);
}); // These attribute exists both in HTML and SVG.
// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.

['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These attributes accept URLs. These must not allow javascript: URLS.
// These will also need to accept Trusted Types object in the future.

var xlinkHref = 'xlinkHref';
properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
false);
['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  true, // sanitizeURL
  true);
});

var _require = __webpack_require__(/*! ../lib/possibleStandardNamesOptimized */ "./node_modules/react-property/lib/possibleStandardNamesOptimized.js"),
    CAMELCASE = _require.CAMELCASE,
    SAME = _require.SAME,
    possibleStandardNamesOptimized = _require.possibleStandardNames;

var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
/**
 * Checks whether a property name is a custom attribute.
 *
 * @see {@link https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L23-L25}
 *
 * @param {string}
 * @return {boolean}
 */

var isCustomAttribute = RegExp.prototype.test.bind( // eslint-disable-next-line no-misleading-character-class
new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
var possibleStandardNames = Object.keys(possibleStandardNamesOptimized).reduce(function (accumulator, standardName) {
  var propName = possibleStandardNamesOptimized[standardName];

  if (propName === SAME) {
    accumulator[standardName] = standardName;
  } else if (propName === CAMELCASE) {
    accumulator[standardName.toLowerCase()] = standardName;
  } else {
    accumulator[standardName] = propName;
  }

  return accumulator;
}, {});
exports.BOOLEAN = BOOLEAN;
exports.BOOLEANISH_STRING = BOOLEANISH_STRING;
exports.NUMERIC = NUMERIC;
exports.OVERLOADED_BOOLEAN = OVERLOADED_BOOLEAN;
exports.POSITIVE_NUMERIC = POSITIVE_NUMERIC;
exports.RESERVED = RESERVED;
exports.STRING = STRING;
exports.getPropertyInfo = getPropertyInfo;
exports.isCustomAttribute = isCustomAttribute;
exports.possibleStandardNames = possibleStandardNames;

/***/ }),

/***/ "./node_modules/react-property/lib/possibleStandardNamesOptimized.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-property/lib/possibleStandardNamesOptimized.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

// An attribute in which the DOM/SVG standard name is the same as the React prop name (e.g., 'accept').
var SAME = 0;
exports.SAME = SAME; // An attribute in which the React prop name is the camelcased version of the DOM/SVG standard name (e.g., 'acceptCharset').

var CAMELCASE = 1;
exports.CAMELCASE = CAMELCASE;
exports.possibleStandardNames = {
  accept: 0,
  acceptCharset: 1,
  'accept-charset': 'acceptCharset',
  accessKey: 1,
  action: 0,
  allowFullScreen: 1,
  alt: 0,
  as: 0,
  async: 0,
  autoCapitalize: 1,
  autoComplete: 1,
  autoCorrect: 1,
  autoFocus: 1,
  autoPlay: 1,
  autoSave: 1,
  capture: 0,
  cellPadding: 1,
  cellSpacing: 1,
  challenge: 0,
  charSet: 1,
  checked: 0,
  children: 0,
  cite: 0,
  class: 'className',
  classID: 1,
  className: 1,
  cols: 0,
  colSpan: 1,
  content: 0,
  contentEditable: 1,
  contextMenu: 1,
  controls: 0,
  controlsList: 1,
  coords: 0,
  crossOrigin: 1,
  dangerouslySetInnerHTML: 1,
  data: 0,
  dateTime: 1,
  default: 0,
  defaultChecked: 1,
  defaultValue: 1,
  defer: 0,
  dir: 0,
  disabled: 0,
  disablePictureInPicture: 1,
  disableRemotePlayback: 1,
  download: 0,
  draggable: 0,
  encType: 1,
  enterKeyHint: 1,
  for: 'htmlFor',
  form: 0,
  formMethod: 1,
  formAction: 1,
  formEncType: 1,
  formNoValidate: 1,
  formTarget: 1,
  frameBorder: 1,
  headers: 0,
  height: 0,
  hidden: 0,
  high: 0,
  href: 0,
  hrefLang: 1,
  htmlFor: 1,
  httpEquiv: 1,
  'http-equiv': 'httpEquiv',
  icon: 0,
  id: 0,
  innerHTML: 1,
  inputMode: 1,
  integrity: 0,
  is: 0,
  itemID: 1,
  itemProp: 1,
  itemRef: 1,
  itemScope: 1,
  itemType: 1,
  keyParams: 1,
  keyType: 1,
  kind: 0,
  label: 0,
  lang: 0,
  list: 0,
  loop: 0,
  low: 0,
  manifest: 0,
  marginWidth: 1,
  marginHeight: 1,
  max: 0,
  maxLength: 1,
  media: 0,
  mediaGroup: 1,
  method: 0,
  min: 0,
  minLength: 1,
  multiple: 0,
  muted: 0,
  name: 0,
  noModule: 1,
  nonce: 0,
  noValidate: 1,
  open: 0,
  optimum: 0,
  pattern: 0,
  placeholder: 0,
  playsInline: 1,
  poster: 0,
  preload: 0,
  profile: 0,
  radioGroup: 1,
  readOnly: 1,
  referrerPolicy: 1,
  rel: 0,
  required: 0,
  reversed: 0,
  role: 0,
  rows: 0,
  rowSpan: 1,
  sandbox: 0,
  scope: 0,
  scoped: 0,
  scrolling: 0,
  seamless: 0,
  selected: 0,
  shape: 0,
  size: 0,
  sizes: 0,
  span: 0,
  spellCheck: 1,
  src: 0,
  srcDoc: 1,
  srcLang: 1,
  srcSet: 1,
  start: 0,
  step: 0,
  style: 0,
  summary: 0,
  tabIndex: 1,
  target: 0,
  title: 0,
  type: 0,
  useMap: 1,
  value: 0,
  width: 0,
  wmode: 0,
  wrap: 0,
  about: 0,
  accentHeight: 1,
  'accent-height': 'accentHeight',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 1,
  'alignment-baseline': 'alignmentBaseline',
  allowReorder: 1,
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 1,
  'arabic-form': 'arabicForm',
  ascent: 0,
  attributeName: 1,
  attributeType: 1,
  autoReverse: 1,
  azimuth: 0,
  baseFrequency: 1,
  baselineShift: 1,
  'baseline-shift': 'baselineShift',
  baseProfile: 1,
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 1,
  capHeight: 1,
  'cap-height': 'capHeight',
  clip: 0,
  clipPath: 1,
  'clip-path': 'clipPath',
  clipPathUnits: 1,
  clipRule: 1,
  'clip-rule': 'clipRule',
  color: 0,
  colorInterpolation: 1,
  'color-interpolation': 'colorInterpolation',
  colorInterpolationFilters: 1,
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorProfile: 1,
  'color-profile': 'colorProfile',
  colorRendering: 1,
  'color-rendering': 'colorRendering',
  contentScriptType: 1,
  contentStyleType: 1,
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  datatype: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 1,
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 1,
  'dominant-baseline': 'dominantBaseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 1,
  elevation: 0,
  enableBackground: 1,
  'enable-background': 'enableBackground',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 1,
  fill: 0,
  fillOpacity: 1,
  'fill-opacity': 'fillOpacity',
  fillRule: 1,
  'fill-rule': 'fillRule',
  filter: 0,
  filterRes: 1,
  filterUnits: 1,
  floodOpacity: 1,
  'flood-opacity': 'floodOpacity',
  floodColor: 1,
  'flood-color': 'floodColor',
  focusable: 0,
  fontFamily: 1,
  'font-family': 'fontFamily',
  fontSize: 1,
  'font-size': 'fontSize',
  fontSizeAdjust: 1,
  'font-size-adjust': 'fontSizeAdjust',
  fontStretch: 1,
  'font-stretch': 'fontStretch',
  fontStyle: 1,
  'font-style': 'fontStyle',
  fontVariant: 1,
  'font-variant': 'fontVariant',
  fontWeight: 1,
  'font-weight': 'fontWeight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 1,
  'glyph-name': 'glyphName',
  glyphOrientationHorizontal: 1,
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphOrientationVertical: 1,
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphRef: 1,
  gradientTransform: 1,
  gradientUnits: 1,
  hanging: 0,
  horizAdvX: 1,
  'horiz-adv-x': 'horizAdvX',
  horizOriginX: 1,
  'horiz-origin-x': 'horizOriginX',
  ideographic: 0,
  imageRendering: 1,
  'image-rendering': 'imageRendering',
  in2: 0,
  in: 0,
  inlist: 0,
  intercept: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  k: 0,
  kernelMatrix: 1,
  kernelUnitLength: 1,
  kerning: 0,
  keyPoints: 1,
  keySplines: 1,
  keyTimes: 1,
  lengthAdjust: 1,
  letterSpacing: 1,
  'letter-spacing': 'letterSpacing',
  lightingColor: 1,
  'lighting-color': 'lightingColor',
  limitingConeAngle: 1,
  local: 0,
  markerEnd: 1,
  'marker-end': 'markerEnd',
  markerHeight: 1,
  markerMid: 1,
  'marker-mid': 'markerMid',
  markerStart: 1,
  'marker-start': 'markerStart',
  markerUnits: 1,
  markerWidth: 1,
  mask: 0,
  maskContentUnits: 1,
  maskUnits: 1,
  mathematical: 0,
  mode: 0,
  numOctaves: 1,
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 1,
  'overline-position': 'overlinePosition',
  overlineThickness: 1,
  'overline-thickness': 'overlineThickness',
  paintOrder: 1,
  'paint-order': 'paintOrder',
  panose1: 0,
  'panose-1': 'panose1',
  pathLength: 1,
  patternContentUnits: 1,
  patternTransform: 1,
  patternUnits: 1,
  pointerEvents: 1,
  'pointer-events': 'pointerEvents',
  points: 0,
  pointsAtX: 1,
  pointsAtY: 1,
  pointsAtZ: 1,
  prefix: 0,
  preserveAlpha: 1,
  preserveAspectRatio: 1,
  primitiveUnits: 1,
  property: 0,
  r: 0,
  radius: 0,
  refX: 1,
  refY: 1,
  renderingIntent: 1,
  'rendering-intent': 'renderingIntent',
  repeatCount: 1,
  repeatDur: 1,
  requiredExtensions: 1,
  requiredFeatures: 1,
  resource: 0,
  restart: 0,
  result: 0,
  results: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  security: 0,
  seed: 0,
  shapeRendering: 1,
  'shape-rendering': 'shapeRendering',
  slope: 0,
  spacing: 0,
  specularConstant: 1,
  specularExponent: 1,
  speed: 0,
  spreadMethod: 1,
  startOffset: 1,
  stdDeviation: 1,
  stemh: 0,
  stemv: 0,
  stitchTiles: 1,
  stopColor: 1,
  'stop-color': 'stopColor',
  stopOpacity: 1,
  'stop-opacity': 'stopOpacity',
  strikethroughPosition: 1,
  'strikethrough-position': 'strikethroughPosition',
  strikethroughThickness: 1,
  'strikethrough-thickness': 'strikethroughThickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 1,
  'stroke-dasharray': 'strokeDasharray',
  strokeDashoffset: 1,
  'stroke-dashoffset': 'strokeDashoffset',
  strokeLinecap: 1,
  'stroke-linecap': 'strokeLinecap',
  strokeLinejoin: 1,
  'stroke-linejoin': 'strokeLinejoin',
  strokeMiterlimit: 1,
  'stroke-miterlimit': 'strokeMiterlimit',
  strokeWidth: 1,
  'stroke-width': 'strokeWidth',
  strokeOpacity: 1,
  'stroke-opacity': 'strokeOpacity',
  suppressContentEditableWarning: 1,
  suppressHydrationWarning: 1,
  surfaceScale: 1,
  systemLanguage: 1,
  tableValues: 1,
  targetX: 1,
  targetY: 1,
  textAnchor: 1,
  'text-anchor': 'textAnchor',
  textDecoration: 1,
  'text-decoration': 'textDecoration',
  textLength: 1,
  textRendering: 1,
  'text-rendering': 'textRendering',
  to: 0,
  transform: 0,
  typeof: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 1,
  'underline-position': 'underlinePosition',
  underlineThickness: 1,
  'underline-thickness': 'underlineThickness',
  unicode: 0,
  unicodeBidi: 1,
  'unicode-bidi': 'unicodeBidi',
  unicodeRange: 1,
  'unicode-range': 'unicodeRange',
  unitsPerEm: 1,
  'units-per-em': 'unitsPerEm',
  unselectable: 0,
  vAlphabetic: 1,
  'v-alphabetic': 'vAlphabetic',
  values: 0,
  vectorEffect: 1,
  'vector-effect': 'vectorEffect',
  version: 0,
  vertAdvY: 1,
  'vert-adv-y': 'vertAdvY',
  vertOriginX: 1,
  'vert-origin-x': 'vertOriginX',
  vertOriginY: 1,
  'vert-origin-y': 'vertOriginY',
  vHanging: 1,
  'v-hanging': 'vHanging',
  vIdeographic: 1,
  'v-ideographic': 'vIdeographic',
  viewBox: 1,
  viewTarget: 1,
  visibility: 0,
  vMathematical: 1,
  'v-mathematical': 'vMathematical',
  vocab: 0,
  widths: 0,
  wordSpacing: 1,
  'word-spacing': 'wordSpacing',
  writingMode: 1,
  'writing-mode': 'writingMode',
  x1: 0,
  x2: 0,
  x: 0,
  xChannelSelector: 1,
  xHeight: 1,
  'x-height': 'xHeight',
  xlinkActuate: 1,
  'xlink:actuate': 'xlinkActuate',
  xlinkArcrole: 1,
  'xlink:arcrole': 'xlinkArcrole',
  xlinkHref: 1,
  'xlink:href': 'xlinkHref',
  xlinkRole: 1,
  'xlink:role': 'xlinkRole',
  xlinkShow: 1,
  'xlink:show': 'xlinkShow',
  xlinkTitle: 1,
  'xlink:title': 'xlinkTitle',
  xlinkType: 1,
  'xlink:type': 'xlinkType',
  xmlBase: 1,
  'xml:base': 'xmlBase',
  xmlLang: 1,
  'xml:lang': 'xmlLang',
  xmlns: 0,
  'xml:space': 'xmlSpace',
  xmlnsXlink: 1,
  'xmlns:xlink': 'xmlnsXlink',
  xmlSpace: 1,
  y1: 0,
  y2: 0,
  y: 0,
  yChannelSelector: 1,
  z: 0,
  zoomAndPan: 1
};

/***/ }),

/***/ "./node_modules/style-to-js/cjs/index.js":
/*!***********************************************!*\
  !*** ./node_modules/style-to-js/cjs/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var style_to_object_1 = __importDefault(__webpack_require__(/*! style-to-object */ "./node_modules/style-to-object/index.js"));

var utilities_1 = __webpack_require__(/*! ./utilities */ "./node_modules/style-to-js/cjs/utilities.js");

function StyleToJS(style, options) {
  var output = {};

  if (!style || typeof style !== 'string') {
    return output;
  }

  (0, style_to_object_1["default"])(style, function (property, value) {
    if (property && value) {
      output[(0, utilities_1.camelCase)(property, options)] = value;
    }
  });
  return output;
}

exports["default"] = StyleToJS;

/***/ }),

/***/ "./node_modules/style-to-js/cjs/utilities.js":
/*!***************************************************!*\
  !*** ./node_modules/style-to-js/cjs/utilities.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.camelCase = void 0;
var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
var HYPHEN_REGEX = /-([a-z])/g;
var NO_HYPHEN_REGEX = /^[^-]+$/;
var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;

var skipCamelCase = function (property) {
  return !property || NO_HYPHEN_REGEX.test(property) || CUSTOM_PROPERTY_REGEX.test(property);
};

var capitalize = function (match, character) {
  return character.toUpperCase();
};

var trimHyphen = function (match, prefix) {
  return "".concat(prefix, "-");
};

var camelCase = function (property, options) {
  if (options === void 0) {
    options = {};
  }

  if (skipCamelCase(property)) {
    return property;
  }

  property = property.toLowerCase();

  if (options.reactCompat) {
    property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
  } else {
    property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
  }

  return property.replace(HYPHEN_REGEX, capitalize);
};

exports.camelCase = camelCase;

/***/ }),

/***/ "./node_modules/style-to-object/index.js":
/*!***********************************************!*\
  !*** ./node_modules/style-to-object/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(/*! inline-style-parser */ "./node_modules/inline-style-parser/index.js");
/**
 * Parses inline style to object.
 *
 * @example
 * // returns { 'line-height': '42' }
 * StyleToObject('line-height: 42;');
 *
 * @param  {String}      style      - The inline style.
 * @param  {Function}    [iterator] - The iterator function.
 * @return {null|Object}
 */


function StyleToObject(style, iterator) {
  var output = null;

  if (!style || typeof style !== 'string') {
    return output;
  }

  var declaration;
  var declarations = parse(style);
  var hasIterator = typeof iterator === 'function';
  var property;
  var value;

  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }

  return output;
}

module.exports = StyleToObject;
module.exports["default"] = StyleToObject; // ESM support

/***/ }),

/***/ "./src/react/adapters.js":
/*!*******************************!*\
  !*** ./src/react/adapters.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonAdapter": () => (/* binding */ ButtonAdapter),
/* harmony export */   "InputAdapter": () => (/* binding */ InputAdapter),
/* harmony export */   "debounce": () => (/* reexport safe */ lodash__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   "throttle": () => (/* reexport safe */ lodash__WEBPACK_IMPORTED_MODULE_4__.throttle)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shiny__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shiny */ "./src/react/Shiny.ts");
/* harmony import */ var _mapReactData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapReactData */ "./src/react/mapReactData.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





 // The higher-level components in this file can be used to adapt the interface of React components
// to make it in line with what is expected from Shiny inputs / buttons. The adapters add
// an `inputId` prop and use `Shiny.setInputValue()` to send value / clicks to the R backend.
// Each input adapter instance registers an update handler with its `inputId` so it can be updated
// using Shiny's `session$sendCustomMessage()` mechanism. The wrapped component is used
// in a controlled manner, which allows also for the value to be updated from R.

var updateHandlers = {};

if ((0,_Shiny__WEBPACK_IMPORTED_MODULE_2__.isShiny)()) {
  _Shiny__WEBPACK_IMPORTED_MODULE_2__.Shiny.addCustomMessageHandler('updateReactInput', function (_ref) {
    var inputId = _ref.inputId,
        data = _ref.data;

    if (inputId in updateHandlers) {
      updateHandlers[inputId]((0,_mapReactData__WEBPACK_IMPORTED_MODULE_3__["default"])(data));
    } else throw new Error("Attempted to update non-existent React input '".concat(inputId, "'"));
  });
}

var withFirstCall = function withFirstCall(first, rest) {
  var firstCall = true;
  return function () {
    if (firstCall) {
      firstCall = false;
      first.apply(void 0, arguments);
    }

    rest.apply(void 0, arguments);
  };
};
/**
 * Hook for setting input value with rate limiting.
 *
 * On mount: sets initial value without rate limiting
 * On inputId change: set value without rate limit
 * On value change: sets new value with rate limiting
 * On unmount: flushes current value
 *
 * @param {rateLimit} An object of shape:
 *   - policy: A policy function, e.g. debounce
 *   - delay: Delay to use in policy function
 */


function useValue(inputId, defaultValue, rateLimit) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var setInputValue = function setInputValue(v) {
      return _Shiny__WEBPACK_IMPORTED_MODULE_2__.Shiny.setInputValue(inputId, v);
    };

    if (rateLimit === undefined) {
      ref.current = setInputValue; // No cleanup effect

      return undefined;
    }

    var setInputValueRateLimited = rateLimit.policy(setInputValue, rateLimit.delay);
    ref.current = withFirstCall(setInputValue, setInputValueRateLimited);
    return setInputValueRateLimited.flush;
  }, [inputId]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    ref.current(value);
  }, [inputId, value]);
  return [value, setValue];
}

function useUpdatedProps(inputId, setValue) {
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      updatedProps = _useState4[0],
      setUpdatedProps = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var updateHandler = function updateHandler(props) {
      var value = props.value,
          newProps = _objectWithoutProperties(props, ["value"]);

      if (value !== undefined) setValue(value);
      setUpdatedProps(_objectSpread(_objectSpread({}, updatedProps), newProps));
    };

    updateHandlers[inputId] = updateHandler;
    return function () {
      // When the component is rerendered inside `renderUI()`, the new instance is initialised
      // (and registers its update handler) *before* the old one is cleaned up. Here we ensure
      // that the old instance only removes its own update handler.
      if (updateHandlers[inputId] === updateHandler) delete updateHandlers[inputId];
    };
  }, [inputId]);
  return updatedProps;
}

function InputAdapter(Component, valueProps, rateLimit) {
  function Adapter(_ref2) {
    var inputId = _ref2.inputId,
        defaultValue = _ref2.value,
        otherProps = _objectWithoutProperties(_ref2, ["inputId", "value"]);

    var _useValue = useValue(inputId, defaultValue, rateLimit),
        _useValue2 = _slicedToArray(_useValue, 2),
        value = _useValue2[0],
        setValue = _useValue2[1];

    var updatedProps = useUpdatedProps(inputId, setValue);

    var props = _objectSpread(_objectSpread({
      id: inputId
    }, otherProps), updatedProps);

    props = _objectSpread(_objectSpread({}, valueProps(value, setValue, props)), props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, props);
  }

  Adapter.propTypes = {
    inputId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string.isRequired),
    value: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().any.isRequired) // eslint-disable-line react/forbid-prop-types

  };
  return Adapter;
}
function ButtonAdapter(Component) {
  function Adapter(_ref3) {
    var inputId = _ref3.inputId,
        otherProps = _objectWithoutProperties(_ref3, ["inputId"]);

    var _useValue3 = useValue(inputId, null),
        _useValue4 = _slicedToArray(_useValue3, 2),
        value = _useValue4[0],
        setValue = _useValue4[1];

    var updatedProps = useUpdatedProps(inputId, setValue);

    var props = _objectSpread(_objectSpread({
      id: inputId,
      onClick: function onClick() {
        return setValue(value + 1);
      }
    }, otherProps), updatedProps);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, props);
  }

  Adapter.propTypes = {
    inputId: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string.isRequired)
  };
  return Adapter;
}

/***/ }),

/***/ "./src/react/findAndRenderReactData.js":
/*!*********************************************!*\
  !*** ./src/react/findAndRenderReactData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findAndRenderReactData)
/* harmony export */ });
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _onceShinyInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onceShinyInitialized */ "./src/react/onceShinyInitialized.js");
/* harmony import */ var _mapReactData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapReactData */ "./src/react/mapReactData.js");
/* harmony import */ var _Shiny__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shiny */ "./src/react/Shiny.ts");



 // ReactDOM.createRoot can be called only once on a container, it serves as a lookup of all created roots.
// To unmount a component, we need the reference to the root from the lookup.
// The key is a `data-react-id` which uniquely identifies the container.

var roots = {};

if ((0,_Shiny__WEBPACK_IMPORTED_MODULE_3__.isShiny)()) {
  var binding = new _Shiny__WEBPACK_IMPORTED_MODULE_3__.Shiny.OutputBinding();

  binding.find = function (scope) {
    return scope.find('.react-container');
  };

  binding.renderValue = function (container, _ref) {
    var data = _ref.data,
        deps = _ref.deps;
    _Shiny__WEBPACK_IMPORTED_MODULE_3__.Shiny.renderDependencies(deps);
    var id = container.getAttribute('data-react-id');

    if (!roots[id]) {
      roots[id] = react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot(container);
    }

    roots[id].render((0,_mapReactData__WEBPACK_IMPORTED_MODULE_2__["default"])(data));
  };

  _Shiny__WEBPACK_IMPORTED_MODULE_3__.Shiny.outputBindings.register(binding, 'shiny.react');
}

function unmount(node) {
  var id = node.getAttribute('data-react-id');

  if (roots[id]) {
    roots[id].unmount();
    delete roots[id];
  }
}

function unmountContainersAtNode(node) {
  if (node instanceof Element) {
    [].forEach.call(node.getElementsByClassName('react-container'), function (container) {
      unmount(container);
    }); // The getElementsByClassName() method only returns descendants - check the node itself too.

    if (node.classList.contains('react-container')) {
      unmount(node);
    }
  }
}

function cleanupRemovedNodes(mutations) {
  mutations.forEach(function (_ref2) {
    var removedNodes = _ref2.removedNodes;
    removedNodes.forEach(unmountContainersAtNode);
  });
}

new MutationObserver(cleanupRemovedNodes).observe(document, {
  childList: true,
  subtree: true
});
function findAndRenderReactData(id) {
  (0,_onceShinyInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
    var container = document.querySelector("[data-react-id=".concat(id, "]"));
    var data = JSON.parse(container.querySelector('.react-data').innerHTML);
    roots[id] = react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot(container);
    roots[id].render((0,_mapReactData__WEBPACK_IMPORTED_MODULE_2__["default"])(data));
  });
}

/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonAdapter": () => (/* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_0__.ButtonAdapter),
/* harmony export */   "InputAdapter": () => (/* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_0__.InputAdapter),
/* harmony export */   "ShinyBindingWrapper": () => (/* reexport safe */ _shinyBindings__WEBPACK_IMPORTED_MODULE_2__.ShinyBindingWrapper),
/* harmony export */   "debounce": () => (/* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_0__.debounce),
/* harmony export */   "findAndRenderReactData": () => (/* reexport safe */ _findAndRenderReactData__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "throttle": () => (/* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_0__.throttle)
/* harmony export */ });
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters */ "./src/react/adapters.js");
/* harmony import */ var _findAndRenderReactData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findAndRenderReactData */ "./src/react/findAndRenderReactData.js");
/* harmony import */ var _shinyBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shinyBindings */ "./src/react/shinyBindings.jsx");




/***/ }),

/***/ "./src/react/mapReactData.js":
/*!***********************************!*\
  !*** ./src/react/mapReactData.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mapReactData)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-react-parser */ "./node_modules/html-react-parser/index.mjs");
/* harmony import */ var _shinyBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shinyBindings */ "./src/react/shinyBindings.jsx");
/* harmony import */ var _Shiny__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shiny */ "./src/react/Shiny.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var dataMappers = {};
function mapReactData(data) {
  var type = data.type;

  if (type in dataMappers) {
    return dataMappers[type](data);
  }

  throw new TypeError("Unknown React data type '".concat(type, "'"));
}

function mapValues(object, func) {
  return Object.fromEntries(Object.entries(object).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return [key, func(val)];
  }));
} // This function maps an inline CSS string to an object understood by React. It relies on the
// undocumented behavior of React: it accepts CSS property names with dashes and lower case letters.
// For example, `style: { 'background-color': 'red' }` works.


function styleStringToObject(styleString) {
  var style = {};
  styleString.split(';').forEach(function (attribute) {
    var match = attribute.match(/^\s*([\w-]*)\s*:(.*)$/);

    if (match) {
      var _match = _slicedToArray(match, 3),
          name = _match[1],
          value = _match[2];

      style[name.toLowerCase()] = value;
    }
  });
  return style;
}

function renameKey(object, from, to) {
  if (from in object && from !== to) {
    object[to] = object[from]; // eslint-disable-line no-param-reassign

    delete object[from]; // eslint-disable-line no-param-reassign
  }

  return object;
} // There are a number of attributes that work differently between React and HTML. This function
// does not provide full compatibility, but does a fairly good job. To some extent this relies
// on the undocumented behavior of react: the tag / attribute names which are renamed in React
// (usually to camelCase), actually work just fine withhout renaming. For example, these work:
//   * `React.createElement('font-size')`
//   * `React.createElement('label', { 'for': 'target', 'class': 'nice' })`
//
// This function should be improved in the future, probably using some external library to do
// the translation. Full list of differences between React and HTML is available here:
// https://reactjs.org/docs/dom-elements.html


function prepareProps(elementName, propsData) {
  var props = mapReactData(propsData);
  renameKey(props, 'class', 'className');
  renameKey(props, 'for', 'htmlFor'); // https://reactjs.org/docs/uncontrolled-components.html#default-values

  if (['input', 'select', 'textarea'].includes(elementName)) {
    renameKey(props, 'value', 'defaultValue');
    renameKey(props, 'checked', 'defaultChecked');
  }

  if (typeof props.style === 'string') {
    props.style = styleStringToObject(props.style);
  }

  return props;
}

dataMappers.raw = function (_ref3) {
  var value = _ref3.value;
  return value;
};

dataMappers.html = function (_ref4) {
  var value = _ref4.value;
  return (0,html_react_parser__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
};

dataMappers.expr = function (_ref5) {
  var value = _ref5.value;
  return eval("(".concat(value, ")"));
}; // eslint-disable-line no-eval


dataMappers.array = function (_ref6) {
  var value = _ref6.value;
  return value.map(mapReactData);
};

dataMappers.object = function (_ref7) {
  var value = _ref7.value;
  return mapValues(value, mapReactData);
}; // eslint-disable-next-line react/prop-types


dataMappers.element = function (_ref8) {
  var module = _ref8.module,
      name = _ref8.name,
      propsData = _ref8.props;
  var component = module ? window.jsmodule[module][name] : name;
  var props = prepareProps(name, propsData);
  var element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(component, props);

  if ((0,_shinyBindings__WEBPACK_IMPORTED_MODULE_2__.needsBindingWrapper)(props.className)) {
    element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_shinyBindings__WEBPACK_IMPORTED_MODULE_2__.ShinyBindingWrapper, {}, element);
  }

  return element;
}; // Used to implement `triggerEvent()` R function.
// The returned function just sets the Shiny input to `TRUE`
// on every call (this works thanks to `priority: 'event'`).


dataMappers.event = function (_ref9) {
  var id = _ref9.id;
  return function () {
    _Shiny__WEBPACK_IMPORTED_MODULE_3__.Shiny.setInputValue(id, true, {
      priority: 'event'
    });
  };
}; // Used to implement `setInput()` R function.


dataMappers.input = function (_ref10) {
  var id = _ref10.id,
      jsAccessor = _ref10.jsAccessor;
  var getValue = eval("(args) => (args".concat(jsAccessor, ")")); // eslint-disable-line no-eval

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _Shiny__WEBPACK_IMPORTED_MODULE_3__.Shiny.setInputValue(id, getValue(args), {
      priority: 'event'
    });
  };
};

/***/ }),

/***/ "./src/react/onceShinyInitialized.js":
/*!*******************************************!*\
  !*** ./src/react/onceShinyInitialized.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onceShinyInitialized)
/* harmony export */ });
/* harmony import */ var _Shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shiny */ "./src/react/Shiny.ts");
 // Shiny initializes some functions after a delay:
// https://github.com/rstudio/shiny/blob/cda59da698eba1deda20ba09ca8b7f0b0b149f87/srcts/src/shiny/index.ts#L101

function shinyInitialized() {
  return (0,_Shiny__WEBPACK_IMPORTED_MODULE_0__.isShiny)() ? _Shiny__WEBPACK_IMPORTED_MODULE_0__.Shiny.setInputValue !== undefined : true;
} // Run `callback` and keep retrying with exponential backoff until it returns true.


function retry(callback) {
  var retryDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (!callback()) setTimeout(retry, retryDelay, callback, retryDelay * 2);
}

var callbackQueue = []; // Run `callback` asynchronously (in another event loop iteration)
// and only once Shiny is fully initialized.

function onceShinyInitialized(callback) {
  if (shinyInitialized()) {
    setTimeout(callback);
  } else {
    callbackQueue.push(callback);
  }
}
retry(function () {
  if (shinyInitialized()) {
    callbackQueue.forEach(function (callback) {
      return setTimeout(callback);
    });
    callbackQueue.length = 0;
    return true;
  }

  return false;
});

/***/ }),

/***/ "./src/react/shinyBindings.jsx":
/*!*************************************!*\
  !*** ./src/react/shinyBindings.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShinyBindingWrapper": () => (/* binding */ ShinyBindingWrapper),
/* harmony export */   "needsBindingWrapper": () => (/* binding */ needsBindingWrapper)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shiny__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shiny */ "./src/react/Shiny.ts");



var regex = new RegExp([// `shiny::actionButton()` and `shiny::actionLink()`.
'action-button', // All Shiny inputs, e.g. `shiny::textInput()`.
'shiny-input-container', // All Shiny outputs, e.g. `shiny::textOutput()`.
'shiny-\\w*-output', // Outputs created with the `htmlwidgets` package, e.g. `leaflet::leafletOutput()`.
'html-widget-output', // `shiny.react::reactOutput()`.
'react-container'].join('|'));
function needsBindingWrapper(className) {
  return regex.test(className);
}
function ShinyBindingWrapper(_ref) {
  var children = _ref.children;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var wrapper = ref.current;
    _Shiny__WEBPACK_IMPORTED_MODULE_2__.Shiny.initializeInputs(wrapper);
    _Shiny__WEBPACK_IMPORTED_MODULE_2__.Shiny.bindAll(wrapper);
    return function () {
      return _Shiny__WEBPACK_IMPORTED_MODULE_2__.Shiny.unbindAll(wrapper);
    };
  }, []);
  return (
    /*#__PURE__*/
    // Mark with a CSS class for HTML readability.
    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      ref: ref,
      className: "shiny-binding-wrapper"
    }, children)
  );
}
ShinyBindingWrapper.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)
};
ShinyBindingWrapper.defaultProps = {
  children: null
};

/***/ }),

/***/ "./src/setupModules.js":
/*!*****************************!*\
  !*** ./src/setupModules.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable global-require, quote-props */
window.jsmodule = _objectSpread(_objectSpread({}, window.jsmodule), {}, {
  'prop-types': __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"),
  'react': __webpack_require__(/*! react */ "react"),
  'react-dom': __webpack_require__(/*! react-dom */ "react-dom"),
  '@/shiny.react': __webpack_require__(/*! ./react */ "./src/react/index.js"),
  '@/shiny.react/test-components': __webpack_require__(/*! ./test-components */ "./src/test-components/index.js")
});

/***/ }),

/***/ "./src/test-components/Box.jsx":
/*!*************************************!*\
  !*** ./src/test-components/Box.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function Box(_ref) {
  var style = _ref.style,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["style", "children"]);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setVisible(!visible);
    }
  }, visible ? 'Hide' : 'Show'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", _extends({
    style: _objectSpread({
      padding: '5px',
      border: 'solid black 1px'
    }, style)
  }, rest), visible && children));
}
Box.propTypes = {
  style: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
  // eslint-disable-line react/forbid-prop-types
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)
};
Box.defaultProps = {
  style: undefined,
  children: undefined
};

/***/ }),

/***/ "./src/test-components/Counter.jsx":
/*!*****************************************!*\
  !*** ./src/test-components/Counter.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Counter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function Counter(_ref) {
  var defaultValue = _ref.defaultValue,
      onChange = _ref.onChange;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var handleClick = function handleClick() {
    setValue(value + 1);
    if (onChange) onChange(value + 1);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: handleClick
  }, value);
}
Counter.propTypes = {
  defaultValue: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};
Counter.defaultProps = {
  defaultValue: 0,
  onChange: undefined
};

/***/ }),

/***/ "./src/test-components/Pinger.jsx":
/*!****************************************!*\
  !*** ./src/test-components/Pinger.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pinger)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function useStateRef(x) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    ref.current = x;
  }, [x]);
  return ref;
}

function Pinger(_ref) {
  var immediate = _ref.immediate,
      interval = _ref.interval,
      action = _ref.action;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      seq = _useState2[0],
      setSeq = _useState2[1];

  var seqRef = useStateRef(seq);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    function ping() {
      var next = seqRef.current + 1;
      if (action) action(next);
      setSeq(next);
    }

    if (immediate) ping();
    var id = setInterval(ping, interval);
    return function () {
      return clearInterval(id);
    };
  }, []);
  return seq;
}
Pinger.propTypes = {
  immediate: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  interval: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  action: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};
Pinger.defaultProps = {
  immediate: false,
  interval: 1000,
  action: console.log // eslint-disable-line no-console

};

/***/ }),

/***/ "./src/test-components/ReactContext.jsx":
/*!**********************************************!*\
  !*** ./src/test-components/ReactContext.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReactContext)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

function ReactContext(_ref) {
  var children = _ref.children;
  return children;
}
ReactContext.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)
};
ReactContext.defaultProps = {
  children: null
};

/***/ }),

/***/ "./src/test-components/index.js":
/*!**************************************!*\
  !*** ./src/test-components/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* reexport safe */ _Box__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Counter": () => (/* reexport safe */ _Counter__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Pinger": () => (/* reexport safe */ _Pinger__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "ReactContext": () => (/* reexport safe */ _ReactContext__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/test-components/Box.jsx");
/* harmony import */ var _Counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Counter */ "./src/test-components/Counter.jsx");
/* harmony import */ var _Pinger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pinger */ "./src/test-components/Pinger.jsx");
/* harmony import */ var _ReactContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReactContext */ "./src/test-components/ReactContext.jsx");





/***/ }),

/***/ "./src/react/Shiny.ts":
/*!****************************!*\
  !*** ./src/react/Shiny.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isShiny = exports.Shiny = void 0;
function isShiny() {
    return !!window.Shiny;
}
exports.isShiny = isShiny;
const Shiny = window.Shiny;
exports.Shiny = Shiny;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

/***/ }),

/***/ "./node_modules/html-react-parser/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/html-react-parser/index.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comment": () => (/* binding */ Comment),
/* harmony export */   "Element": () => (/* binding */ Element),
/* harmony export */   "ProcessingInstruction": () => (/* binding */ ProcessingInstruction),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "attributesToProps": () => (/* binding */ attributesToProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "domToReact": () => (/* binding */ domToReact),
/* harmony export */   "htmlToDOM": () => (/* binding */ htmlToDOM)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/html-react-parser/index.js");


var domToReact = _index_js__WEBPACK_IMPORTED_MODULE_0__.domToReact;
var htmlToDOM = _index_js__WEBPACK_IMPORTED_MODULE_0__.htmlToDOM;
var attributesToProps = _index_js__WEBPACK_IMPORTED_MODULE_0__.attributesToProps;

// domhandler
var Comment = _index_js__WEBPACK_IMPORTED_MODULE_0__.Comment;
var Element = _index_js__WEBPACK_IMPORTED_MODULE_0__.Element;
var ProcessingInstruction = _index_js__WEBPACK_IMPORTED_MODULE_0__.ProcessingInstruction;
var Text = _index_js__WEBPACK_IMPORTED_MODULE_0__.Text;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./setupModules */ "./src/setupModules.js");

})();

/******/ })()
;

