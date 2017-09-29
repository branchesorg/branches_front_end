;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
    var x,
        y,
        w,
        h,
        e,
        fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'],
        // fontSize = (settings('labelSize') === 'fixed') ?
        //   settings('defaultLabelSize') :
        //   settings('labelSizeRatio') * size;
        fontSize = window.getLabelFontSizeFromNode(node, settings)
        // var fontSize =

    console.log("size is", size)
    console.log("fontSize is", fontSize)
    // Label background:
    context.font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' + (settings('hoverFont') || settings('font'));

    console.log("font is " + context.font)
    context.beginPath();
    context.fillStyle = settings('labelHoverBGColor') === 'node' ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultHoverLabelBGColor');

    if (node.label && settings('labelHoverShadow')) {
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 8;
      context.shadowColor = settings('labelHoverShadowColor');
    }

    // label textbox
    // if (node.label && typeof node.label === 'string') {
    //   x = Math.round(node[prefix + 'x'] - fontSize / 2 - 2);
    //   y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);
    //   w = Math.round(
    //     context.measureText(node.label).width + fontSize / 2 + size + 7
    //   );
    //   h = Math.round(fontSize + 4);
    //   e = Math.round(fontSize / 2 + 2);
    //
    //   context.moveTo(x, y + e);
    //   context.arcTo(x, y, x + e, y, e);
    //   context.lineTo(x + w, y);
    //   context.lineTo(x + w, y + h);
    //   context.lineTo(x + e, y + h);
    //   context.arcTo(x, y + h, x, y + h - e, e);
    //   context.lineTo(x, y + e);
    //
    //   context.closePath();
    //   context.fill();
    //
    //   context.shadowOffsetX = 0;
    //   context.shadowOffsetY = 0;
    //   context.shadowBlur = 0;
    // }

    var font = context.font
    // Node border:
    if (settings('borderSize') > 0) {
      context.strokeStyle= 'black'
      context.font = '1px Fredoka One'
      context.beginPath();
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + settings('borderSize'),
        0,
        2 * Math.PI,
      );
      console.log("the font and fontStyle being used for border are", context.font, context.fillStyle, size)
      // context.closePath();
      context.stroke();
    }
    context.font = font

    // Node:
    // var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    // nodeRenderer(node, context, settings);
    // Display the label:

    if (node.label && typeof node.label === 'string') {
      context.shadowBlur = 0
      context.fillStyle = (settings('labelHoverColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelHoverColor');

      context.fillText(
        node.label,
        Math.round(node[prefix + 'x']),
        Math.round(node[prefix + 'y'] + fontSize / 3)
      );
        console.log("the context while filling text in label is", context)
    }
  };
}).call(window);
