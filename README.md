# FitType.JS
Fit or stretch text content based on its container width and height.

# What does FitType.JS do?
Viewport Sized Typographic allows you to change fontsize based on viewport size, so if you resize your viewport the fonts will resize too. But what if you have a fixed viewport, a container and you want the text always fits the container size when the text grows up?
This is where FitType.JS fits in.

## Options ##

### Fit or Stretch ###

Choose if you want that the content has to `fit` or `stretch` the container width or height.
In this example, FitType.JS will stretch the text until it takes all the available space, that is the minimum between container's width and height.

```javascript
$('table').fittype({
   mode : 'stretch'
});
```

In the following example instead FitType.JS will reduce the text fontsize in order to fit it in his `div` container.

```javascript
$('#adiv').fittype({
   mode : 'fit'
});
```

### Columns ###

If FitType.JS is applied to a `table` it works on the entire table, but if you want you can choose, using a 1-based index, to which columns you want to apply it. In this example, FitType.JS will fit the contents of columns 1 and 3.

```javascript
$('table').fittype({
   columns : [1,3]
});
```

If you apply the `columns` option to a container that is not a table it will be simply ignored.

### Viewport resizing ###

By default FitType.JS will take care to resize contents if you resize your viewport, but if you want you can disable this behavior like in the example below.

```javascript
$('table').fittype({
   responsive : 'false'
});
```

### Custom Resizing Function ###

FitType.JS calculates the fontsize to fit or stretch the container size using a simple mathematical proportion, but you can provide your simple or complex alghoritm to do it better. FitType.JS will call your function for each container to resize providing `width` and `height` of the container, the original `fontsize` and the suggested fontsize to fit/stretch in `width` and `height`.

```javascript
$('table').fittype({
    mode    : 'fit',
    columns : [3],                
    manual  : function (width, height, ofs, fsw, fsh) {
        var size = 0;
        // ... do your work here ...
        return size;
    }
});
```
If you apply it to a `table` your function will be called for each table cell.

### Event dependencies ###

Maybe your text changes when you input some information in an input text or when you select an option from a combobox. You may have for example a text input that updates the container text on `keyup`.

```javascript
var handler = function(el){
   $('#mycontainer').text($(el).val());
}
```

```html
<input id="message" type="text" onkeyup="handler(this);" />
<div id="#mycontainer">
   Hello, my name is Fabio
</div>
```

FitType.JS doesn't know that your text changed so it will not apply fit/stretch again, but you can tell it to do by simply specifying the events of the elements that once triggered must resize the text. In the following example FitType.JS will apply resizing any time that the `keyup` event is raised on the field identified by the jQuery selector `#message`.

```javascript
$('#mycontainer').fittype({
    mode    : 'stretch',
    depends : { '#message' : ['keyup']}
});
```

You can specify multiple events on multiple fields.

```javascript
$('#mycontainer').fittype({
    mode    : 'stretch',
    depends : { '#message' : ['keyup'], '#anotherfield' : ['blur', 'click']}
});
```

In the above example the resizing will be applied everytime that:
- the `keyup` event raises on the input identified by the jQuery selector `#message`
- the `blur` or `click` event raise on the input identified by the jQuery selector `#anotherfield`

## Getting Started ##

### Step 1: Install FitType.JS ###
To use FitType.JS, you'll need to make sure both the jQuery and FitType.JS scripts are included.

#####Download FitType.JS#####
- [Download the latest release](https://github.com/fabiobentoumia/FitType.JS).
- Clone the repo: `git clone https://github.com/fabiobentoumia/FitType.JS.git`.

#####Include jQuery and FitType.JS#####
```html
<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
<script src="FitType.js"></script>
```

### Step 2: Create your table ###

Create your standard HTML table, preferibly using col width sizing with `colgroup` (optional).

```html
<table>
    <colgroup>
        <col style="width:20%" />
        <col style="width:65%" />
        <col style="width:15%" />                        
    </colgroup>
    <thead>
        <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Company</th>                            
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Fabio</td>
            <td>Ben Toumia</td>
            <td>Avanade Italy</td>                            
        </tr>                       
        <tr>
            <td>Matteo</td>
            <td>Ben Toumia</td>
            <td>I'm young and I still go to school</td>
        </tr>
        <tr>
            <td>Samuele</td>
            <td>Ben Toumia</td>
            <td>like my brother</td>
        </tr>                       
    </tbody>
</table>
```

Otherwise you may have any other block container like `div` or `p`.

```html
<div id="mydiv" style="width:100px;height:50px;">
   <span>My fitting text</span>
</div>
```

### Step 3: Call FitType.JS ###
To put FitType.JS at work, simply call it on the container. All the text will be resized (if required) to fit the available space of its container.

```javascript
$('table').fittype();
```

### Step 4: Make Changes ###

You will most likely want to change the default settings. To do so, simply include one of these options in your code:

```javascript
$('table').fittype({
   mode        : 'fit',
   columns     : [3],
   responsive  : true,
   manual      : function(){},
   depends     : {}
});
```

## Made by ##

FitType.JS is made by [Fabio Ben Toumia](https://www.linkedin.com/in/fabio-ben-toumia-66023914) and is licensed under the MIT License. See the LICENSE.txt file for copy permission.
