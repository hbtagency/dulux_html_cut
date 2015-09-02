var Consultants = {

    /**
     * Renders any of the post load items, mainly the sIFR content that might need to be updated.
     */
    render: function() {
        if (sIFR) {
            sIFR.replace(futura, {
              selector: '.carousel .testimonial',
              css: '.sIFR-root { font-size:14px; font-weight:bold; font-style:italic; color: #4c4c4c;}',
              wmode: 'transparent'
            });
        }
    },

    /**
     * Carousel class.
     * @class
     */
    Carousel: function(element) {
        this.element = element[0];
        this.element.carousel = this;
        this.current = 0;
        this.items =  $(this.element).find(".item");

        this.auto = true;

        if (this.items.length == 0) {
            // Nothing to do, time to jump out
            return;
        } else if (this.items.length > 1) {
            $(this.element).append("<div class='controls'><a class='control previous'></a><a class='control next'></a></div>");

            $(this.element).prepend("<div class='mask mask-top'></div>");
            $(this.element).prepend("<div class='mask mask-left'></div>");
            $(this.element).prepend("<div class='mask mask-bottom'></div>");
            $(this.element).prepend("<div class='mask mask-right'></div>");
            $(this.element).css("visibility", "visible");

            var image = $(this.element).find(".item .image");
            image.append("<span class='magnify'></span>");
            image.mouseenter(function() {
                if (jQuery.browser.msie) {
                    $(this).children(".magnify").css("display", "block");
                } else {
                    $(this).children(".magnify").fadeIn();
                }
            });
            image.mouseleave(function() {
                if (jQuery.browser.msie) {
                    $(this).children(".magnify").css("display", "none");
                } else {
                    $(this).children(".magnify").fadeOut();
                }
            });

            image.children(".magnify").click(function() {
                // Pass the click to the hidden link
                $(this).siblings(".addable").children("a").click();
            });

            $(this.element).find(".swatches").mousedown(function(event) {
                $(this).parents(".carousel").each(function(index) {
                    this.carousel.stop();
                });
            });
            $(this.element).find("a.previous").click(function(event) {
                $(this).parents(".carousel")[0].carousel.stop();
                $(this).parents(".carousel")[0].carousel.previous();
            });
            $(this.element).find("a.next").click(function(event) {
                $(this).parents(".carousel")[0].carousel.stop();
                $(this).parents(".carousel")[0].carousel.next();
            });
            $(this.items[0]).addClass("current");
            $(this.element).find(".items").fadeIn(function() { Consultants.render(); });
            if (Shadowbox) {
                Shadowbox.setup(".carousel .items a", {
                    "onOpen": function() {
                        // Stop all animations
                        $(".carousel").each(function(index) {
                            this.carousel.stop();
                        });
                    }
                });
            }
        }


        /**
         * Called on click of the next control.
         */
        this.next = function() {
            var index = this.current + 1;
            if (index >= this.items.length) {
                index = 0;
            }
            this.show(index, "right");
        };

        /**
         * Called on click of the previous control.
         */
        this.previous = function() {
            var index = this.current - 1;
            if (index < 0) {
                index = this.items.length - 1;
            }
            this.show(index, "left");
        };

        this.start = function() {
            var self = this;
            var method = function() {
                return self.animate.apply(self);
            };
            this.thread = window.setTimeout(method, Consultants.Carousel.SPEED);
        };

        /**
         * Pauses the animation. Calling start will resume it.
         */
        this.pause = function() {
            window.clearTimeout(this.thread);
            this.thread = null;
        };

        this.stop = function() {
            window.clearTimeout(this.thread);
            this.thread = null;
            this.auto = false;
        };

        this.animate = function() {
            this.next();
            if (!this.auto) {
                return;
            }
            var self = this;
            var method = function() {
                return self.animate.apply(self);
            };
            this.thread = window.setTimeout(method, Consultants.Carousel.SPEED);
        };
        /**
         * Show the item of the given index. This will transition the current item
         * to the selected index.
         * @param {int} index
         * @param {string} direction
         */
        this.show = function(index, direction) {
            if (index == this.current) {
                // Nothing to do
                return;
            }
            var current = $(this.items[this.current]);

            current.find(".swatches").fadeOut();
            current.find(".testimonial").css("display", "none");
            current.find(".author").fadeOut();

            var next    = $(this.items[index]);
            var image = next.find(".image .addable");
            if (direction == null) {
                direction = (index > this.current) ? "right": "left";
            }
            if (direction == "left") {
                // Right
                image.css("left", -1 * image.innerWidth());
            } else {
                // Left
                image.css("left", image.innerWidth());
            }
            next.addClass("next");
            image.animate({
                "left": "0"
            }, {
                "complete": function() {
                    var items = $(this).parents(".items").children(".item");
                    items.removeClass("current");
                    items.removeClass("next");
                    $(this).parents(".item").addClass("current");
                    $(this).parents(".item").find(".swatches").fadeIn();
                    $(this).parents(".item").find(".testimonial").css("display", "block");
                    $(this).parents(".item").find(".author").fadeIn();
                    Consultants.render();
                }
            });
            this.current = index;
        };
    }
};

/**
 * Speed of the animation in milliseconds.
 */
Consultants.Carousel.SPEED = 8000;

$(document).ready(function() {
    if ($("form.validate").validate) {
        $("form.validate").validate({
            "onsubmit" : true,
            "onkeyup": false,
            "onclick": false,
            "focusCleanup": false,
            "focusInvalid": false,
            "showErrors": function(errorMap, errorList) {
                if (this.invalid.length == 0 && this.errorList.length == 0) {
                    $(this.currentForm).find(".error-alert").css("display", "none");
                    return;
                } else if (errorList.length == 0) {
                    return;
                }
                var errors = $(this.currentForm).find(".error-alert");
                if (errors.length == 0) {
                    $(this.currentForm).find("fieldset").before(
                         "<div class='error-alert'><h3>Oops, the following fields were missed or need to be updated:</h3><ul></ul></div>"
                    );
                    errors = $(this.currentForm).find(".error-alert");
                }
                errors.find("ul").html("");
                for (var i = 0; i < errorList.length; i++) {
                    var element = $(errorList[i].element);
                    var parent = element.parent();
                    var label = "";
                    if (!parent.hasClass("contact-time")) {
                        label = element.parent().children("label").html();
                        label = label.substr(0, label.length - 1);
                    } else {
                        label = "Please select at least one preferred contact time.";
                    }
                    errors.find("ul").append("<li>" + label + " is required.</li>")
                }
            }
        });
    }
    $(".carousel").each(function(index) {
        var carousel = new Consultants.Carousel($(this));
        carousel.start();
    });
});