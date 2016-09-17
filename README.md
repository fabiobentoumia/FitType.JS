# FitType.JS
Fit or stretch table content based on cells width and height.

# What does FitType.JS do?
Viewport Sized Typographic allows you to change fontsize based on viewport size, so if you resize your viewport the fonts will resize too. But what if you have a fixed viewport, a table and you want the text always fit the cell size when the text grows up?
This is where FitType.JS fits in.

## Options ##

### Fit or Stretch ###

Choose if you want that the content has to `fit` or `stretch` the cell width or height.
In this example, FitType.JS will stretch the text until it takes all the available space, that is the minimum between cell's width and height.

```javascript
$('table').fittype({
   mode : 'fit'
});
```
### Columns ###

FitType.JS works on the entire table, but if you want you can choose, using a 1-based index, to which columns you want to apply it. 
In this example, FitType.JS will fit the contents of columns 2 and 6.

```javascript
$('table').fittype({
   columns : [2,6]
});
```

### Animation ###

By default the fit/stretch happens without animation, but if you want you can enable it.
In this example, FitType.JS will stretch the contents of columns 2 and 6 animating the text growth.

```javascript
$('table').fittype({
   mode: 'stretch',
   columns : [2,6],
   animate: true
});
```

### Viewport resizing ###

By default FitType.JS will take care to resize contents if you resize your viewport, but if you want you can disable this behavior like in the example below.

```javascript
$('table').fittype({
   responsive: 'false'
});
```

### Custom Resizing Function ###

FitType.JS calculates the fontsize to fit or stretch the cell size using a simple mathematical proportion, but you can provide your simple or complex alghoritm to do it best. FitType.JS will call your function for each cell to resize providing `width` and `height` of the cell, the original `fontsize` and the suggested fontsize to fit/stretch in `width` and `height`.

```javascript
$('table').fittype({
    mode: 'fit',
    columns: [6],                
    manual: function (width, height, ofs, fsw, fsh) {
        var size = 0;
        // ... do your work here ...
        return size;
    }
});
```

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
        <col style="width:60%" />
        <col style="width:20%" />                        
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

### Step 3: Call FitType.JS ###
To put FitType.JS at work, simply call it on a table.

```javascript
$('table').fittype();
```

### Step 4: Make Changes ###

You will most likely want to change the default settings. To do so, simply include one of these options in your code:

```javascript
$('table').fittype({
   mode      : 'fit',
   columns   : [1,2,5],
   animate   : true,
   responsive: true
});
```

## Made by ##

FitType.JS is made by [Fabio Ben Toumia](https://www.linkedin.com/in/fabio-ben-toumia-66023914) and is licensed under the MIT License. See the LICENSE.txt file for copy permission.
