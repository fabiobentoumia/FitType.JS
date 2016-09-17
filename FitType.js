/*
* FitType.JS v1.0
*
* FitType.JS by Fabio Ben Toumia is licensed
* under the MIT License. Read a copy of the
* license at http://choosealicense.com/licenses/mit
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

        // Force fixed layout on the Table
        this.$element.css('table-layout', 'fixed');

        // Get the array of table cells that will be managed
        this.$cells = $.map(this.columns, function (n) {
            return $.makeArray(that.$element.find('td:nth-child(' + n + ')').css('white-space', 'nowrap'));
        });
    }

    Fitter.TRANSITION_DURATION = 500;
    Fitter.VERSION = 1.0;
    Fitter.SUBTRACTOR_W = ['padding-left', 'padding-right'];
    Fitter.SUBTRACTOR_H = ['padding-top', 'padding-bottom', 'border-top', 'border-bottom'];

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
            var newSpan = $('<span/>').text($el.text()).css('font-size', fs);
            that.$fake.empty().append(newSpan);

            // Calculate the container width/height
            $(Fitter.SUBTRACTOR_W).each(function (k, v) { width -= parseFloat($el.css(v)); });
            $(Fitter.SUBTRACTOR_H).each(function (k, v) { height -= parseFloat($el.css(v)); });
            height = Math.max(height, newSpan.height());

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
        size = $.isFunction(this.options.manual) ? this.options.manual(width, height, fs, sizew, sizeh) : size;
        $el = (this.options.animate) ? $el.animate({ fontSize: size + "px" }, this.TRANSITION_DURATION) : $el.css({ fontSize: size + "px" });
        $el.css({ verticalAlign: 'middle' });
    }

    $.fn.fittype = function (options) {

        // Establish default settings/variables
        var settings = $.extend({
            mode: 'fit',
            columns: [],
            animate: false,
            manual: null,
            responsive: true
        }, options);

        // Iterate over jQuery elements and do the magic
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('fit.data');

            if (!data) $this.data('fit.data', (data = new Fitter($(this), settings)));
            if (settings.responsive) $(window).resize(function () { data.run(); });
            data.run();
        });

    };

}(jQuery));
