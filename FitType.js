/*
* FitType.JS v1.0
*
* FitType.JS by Fabio Ben Toumia is licensed under
* the MIT License. Read a copy of the license
* at http://choosealicense.com/licenses/mit
*
*/
(function ($) {

    var Fitter = function (element, options) {
        var that = this;
        this.options = options;
        this.$element = element;
        this.columns = this.options.columns.length == 0 ? ['1n'] : this.options.columns;

        // Create an invisible fake container into the body
        this.$fake = $('<div/>').prependTo($(document.body)).css({ position: 'absolute', width: '5000px', height: '0px', overflow: 'hidden' });

        // Init FitType.JS
        this.initialize();

        // Attach to the resize event to manage responsiveness
        if (this.options.responsive) $(window).resize(function () { that.run(); });

        // Attach all events from dependencies
        $.each(this.options.depends, function (s, ev) {
            var events = {}
            var handler = function () { that.run(); };

            $.each(ev, function (i, name) {
                events[name] = handler;
            });

            $(s).on(events);
        });
    }

    Fitter.prototype.initialize = function () {
        var that = this;
        var nodeType = this.$element.prop('tagName').toLowerCase();

        switch (nodeType) {
            case 'table':
                // Force fixed layout on the Table
                this.$element.css({ tableLayout: 'fixed' });

                // Get the array of table cells that will be managed
                this.$cells = $.map(this.columns, function (n) {
                    return $.makeArray(that.$element.find('td:nth-child(' + n + ')').css({ whiteSpace: 'nowrap', verticalAlign: 'middle' }));
                });
                break;
            default:
                this.$cells = this.$element.css({ whiteSpace: 'nowrap' });
                break;
        }

    }

    Fitter.prototype.run = function () {
        var that = this;

        $.each(this.$cells, function () {

            var $el = $(this);

            // Get Fontsize and container width/height
            var fs = $el.data('fit.fontsize') || parseFloat($el.css('font-size'));
            var height = $el.data('fit.height') || $el.height();
            var width = $el.width();

            // Store Original fontsize and container height
            $el.data('fit.fontsize', fs);
            $el.data('fit.height', height);

            // Creates a fake span with the original fontsize and append it to the fake container
            var newSpan = $('<span/>').text($el.text()).css({ 'font-size': fs });
            that.$fake.empty().append(newSpan);

            // Calculate the new fontsize by width/height
            var nfsw = Math.floor((width / newSpan.width()) * fs);
            var nfsh = Math.floor((height / newSpan.height()) * fs);

            // Stretch or Fit, based on selected mode
            that[that.options.mode]($el, width, height, nfsw, nfsh, fs);

        });
    }

    Fitter.prototype.stretch = function ($el, width, height, nfsw, nfsh, fs) {
        var size = Math.min(nfsw, nfsh);
        this.resize($el, width, height, nfsw, nfsh, size, fs);
    }

    Fitter.prototype.fit = function ($el, width, height, nfsw, nfsh, fs) {
        var sizew = ((nfsw < fs) ? nfsw : fs);
        var sizeh = ((nfsh < fs) ? nfsh : fs);
        var size = Math.min(sizew, sizeh);
        this.resize($el, width, height, sizew, sizeh, size, fs);
    }

    Fitter.prototype.resize = function ($el, width, height, sizew, sizeh, size, fs) {
        var $nodes = $el.children().length > 0 ? $el.children() : $el;
        var nsize = $.isFunction(this.options.manual) ? this.options.manual(width, height, fs, sizew, sizeh) : size;
        $nodes.css({ fontSize: nsize + "px", 'line-height': (nsize > fs) ? nsize + 'px' : 'inherit' });
    }

    $.fn.fittype = function (options) {

        // Establish default settings/variables
        var settings = $.extend({
            mode: 'fit',
            columns: [],
            manual: null,
            responsive: true,
            depends: []
        }, options);

        // Iterate over jQuery elements and do the magic
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('fit.data');

            if (!data) $this.data('fit.data', (data = new Fitter($(this), settings)));
            data.run();
        });

    };

}(jQuery));
