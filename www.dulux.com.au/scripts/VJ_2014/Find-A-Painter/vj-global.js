/* Dulux Find a Painter Page
   Author: Jetz Alipalo
*/

var DULUX = DULUX || {};

DULUX.fap = (function () {

    var page = {
        init: function () {


            //$("[id*='submitSearch']").attr('href', '');

            //$("[id='newSearch']").click().live("click", function () {
            //    window.location = location.pathname + "#newSearchAnchor";
            //});

            this.html();
            this.form();
            this.oldie();
            this.scrollTo();
            this.tracking();
        },

        html: function () {

            //js dropdowns
            $('.jsAccord li').each(function () {
                var $this = $(this);
                $this.prepend('<i />')

                var $dTrig = $this.find('label'), $dDown = $this.find('article'), $dIcon = $this.find('i');

                //show FAQ description by default
                if ($dDown.hasClass('active')) {
                    $dDown.css('display', 'block');
                    $dIcon.css('background-position', '-8px -246px');
                } else {
                    $dDown.css('display', 'none');
                    $dIcon.css('background-position', '-8px -214px');
                }

                //Toggle Answers
                $dTrig.add($dIcon).on('click', function () {
                    if ($dDown.is(":visible")) {
                        $dDown.slideUp('fast');
                        $dIcon.removeAttr('style')
                    } else {
                        $dDown.slideDown('fast');
                        $dIcon.css('background-position', '-8px -246px');
                    }
                })
            });

            //order list
            $('ol').each(function () {
                count = 1;
                $(this).find('li').each(function () {
                    $(this).prepend('<i>' + count + '</i>')
                    count++
                })
            })

        },

        form: function () {
            var jsForm = $('.jsform')
            jsForm.find(':radio, :checkbox, select').each(function () {

                var elem = $(this);

                // --- Select
                if (elem.is('select')) {
                    elem.wrap('<span class="jsSelect"/>')

                    elem.parent().append('<i />')
                        .append('<em>' + elem.find('option:selected').text() + '</em>')
                    elem.change(function () {
                        elem.parent()
                            .find('em').text(elem.find('option:selected').text())
                    });
                }

                // --- Radio and Checkbox
                if (elem.is(':radio') || elem.is(':checkbox')) {

                    elem.is(':checkbox') ? elem.wrap('<span class="jsCheckbox" />') : elem.wrap('<span class="jsRadio" />')

                    var _parent = elem.parent();
                    elem.bind('updateState', function () {
                        if (elem.is(':checked')) {
                            if (elem.is(':radio')) {
                                $(':radio[name="' + elem.attr('name') + '"]').parent().removeClass('checked');
                            } _parent.addClass('checked');
                        } else { _parent.removeClass('checked') }
                    })
                    .trigger('updateState').click(function () { $(this).trigger('updateState'); });
                }
            });



            jsForm.find('.jsNumberonly').keydown(function (event) {
                if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190, 32, 189]) !== -1 ||
                    (event.keyCode == 65 && event.ctrlKey === true) ||
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
                }
                else {
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            })

        },

        scrollTo: function () {
            $('[data-scroll]').click(function (e) {
                e.preventDefault();
                var section = $(this).attr('href')

                $('html, body').animate({
                    scrollTop: $(section).offset().top
                }, 1000);

                window.location.hash = section
            });
        },

        oldie: function () {

            $('.oldie').length ? run() : undefined;

            function run() {

                // Placeholder
                $('.jsform').find(':text', ':email').each(function () {

                    var elem = $(this);

                    elem.wrap('<span class="input-text"/>')
                    elem.parent().append('<em>' + elem.attr('placeholder') + '</em>');

                    var em = elem.parent().find('em')

                    //Events
                    em.on('click', function () { elem.focus() })
                    elem.val() == "" ? undefined : $(em).css('display', 'none')
                    elem.focus(function () { elem.val() == "" ? $(em).css('display', 'none') : undefined })
                        .blur(function () { elem.val() == "" ? $(em).css('display', 'block') : undefined })
                });

                // Form Group Stripe
                $('.jStriped li:even').css("background-color", "#f5f8f8");
            }

        },

        tracking: function () {
            var

            event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            //Find a painter
            $('.btn-track').on('click', function(e) {
                event.label = $(this).data('even-label');
                _gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'CTA Click',
                    event.label
                ]);
            });


            //FAQ Dropdowns
            faq = { label: $('.faq-dd li label'), icon: $('.faq-dd li i') }

            faq.label.add(faq.icon).on('click', function () {
                event.label = $(this).parent('li').find('label').text();

                _gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'FAQ Click',
                    event.label
                ]);
            });



        }
    },

    validation = {
        //call this function on any page that requires some sort of form validation..
        init: function () {

            $("#find-a-painter-advanced-search").wrap("<form method=\"post\" action=\"/find-a-painter\" id=\"FindAPainter\" novalidate='novalidate'></form>");
            $("#find-a-painter-simple").wrap("<form method=\"post\" action=\"/find-a-painter\" id=\"simpleFindAPainter\" novalidate='novalidate'></form>");

            var formGrand = $('form#aspnetForm');
            var form = $('form#FindAPainter');
            var formSimple = $('form#simpleFindAPainter');

            var event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            form.each(function () {
                var $this = $(this);
                validation.basic($this);
            });

            formSimple.each(function () {
                var $this = $(this);
                validation.basic($this);
            });

            $('#validationSearchBtn').on('click', function(e) {

                e.preventDefault();
                simpleSearch = false;
                
                if (!form.valid())
                {
                    var inputError = $('input.error');
                    inputError.length ? errorTracking() : undefined;
                } else {
                    submitGrandForm.removeFakeValidationForms();
                    submitGrandForm.track("advanced search bottom page");
                    submitGrandForm.submit();
                }

                function errorTracking() {

                    var errors = []

                    inputError.each(function() {
                        var name = $(this).attr('name');
                        errors.push(name);
                    })

                    var errorStg = errors.slice(/[,]+/).join(' | ');

                    _gaq.push([
                        '_trackEvent',
                        event.name = 'Find a Painter',
                        event.type = 'Form error advanced',
                        event.label = errorStg
                    ]);
                }
            });

            $('#validationSearchBtnSimple').on('click', function(e) {

                e.preventDefault();
                simpleSearch = true;
                //formSimple.submit();

                if (!formSimple.valid()) {
                    var inputError = $('input.error');
                    inputError.length ? errorTracking() : undefined;
                } else {
                    submitGrandForm.removeFakeValidationForms();
                    submitGrandForm.track("short form submitted");
                    submitGrandForm.submit();
                }

                function errorTracking() {

                    var errors = []

                    inputError.each(function() {
                        var name = $(this).attr('name');
                        errors.push(name);
                    });

                    var errorStg = errors.slice(/[,]+/).join(' | ');

                    _gaq.push([
                        '_trackEvent',
                        eventSimple.name = 'Find a Painter',
                        eventSimple.type = 'Form error Simple',
                        eventSimple.label = errorStg
                    ]);
                }
            });

            $(document).keydown(function (e) {
                if (e.keyCode == 13) {
                    $("[id*='validationSearchBtn']").trigger('click');
                }
            });

            $(document).keydown(function (e) {
                if (e.keyCode == 13) {
                    $("[id*='validationSearchBtnSimple']").trigger('click');
                }
            });
        },
        basic: function (ele) {

            var event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            ele.validate({
                //basic validation, adds an error class to the input in error.
                //TODO add handling for checkboxes..
                //thinking about changin markup to suit...
                showErrors: function (errorMap, errorList) {

                    for (var i = 0, max = errorList.length; i < max; i += 1) {
                        var $this = $(errorList[i].element);

                        $this.addClass('error');

                        // to check if the element is a jquery select option
                        $this.is('select') ? error($this.parent(), errorList[i].message, true) : error($this, errorList[i].message, false);
                    }

                    //error function
                    function error(elem, message, select) {
                        var $target = elem;
                        $target.next('.erMsg').length ? undefined : $target.after('<span class="erMsg">' + message + '</span>');
                        select = true ? elem.addClass('error') : undefined;
                        $target.prev('label').addClass('lbl-error');
                    }

                },
                submitHandler: function () {

                    _gaq.push([
                        '_trackEvent',
                        event.name = 'Find a Painter',
                        event.type = 'CTA Click',
                        event.label = 'Form Submit'
                    ]);

                    setTimeout(
                      function () {
                          if (simpleSearch)
                              eval(javascriptSearchSimpleBtn);
                          else {
                              eval(javascriptSearchBtn);
                          }

                      }, 200);

                    setTimeout(
                          function () {
                              $('#validationSearchBtn').hide();
                              $('#validationSearchBtnSimple').hide();
                              if (simpleSearch)
                                  $('#loadingGif').show();
                              else {
                                  $('#loadingGifComplex').show();
                              }
                          }, 300);
                }
            });

            ele.on('change', '.error', function () {
                check(
                    $(this), $(this).parent()
                )
            });
            ele.on('keyup', '.error', function () {
                check(
                    $(this), $(this)
                )
            });

            function check(elem, target) {
                if (elem.valid()) {
                    elem.is('select') ? elem.removeClass('error') : undefined;
                    target.prev('label').removeAttr('class');
                    target.removeClass('error');
                    target.next('.erMsg').remove();
                }
            }
        }
    },
    submitGrandForm = {
        //call this function on any page that requires some sort of form validation..
        submit: function () {
            
            setTimeout(
                function () {
                    var city = $("h1").html().replace(/<br>/g, "");
                    if (simpleSearch) {
                        var postcode = $("input[id$='txtPostCodeContactSimple']").val();
                        locationTracking.trackLocationSearchTriggered(city, postcode);
                        eval(javascriptSearchSimpleBtn);
                    } else {
                        var postcode = $("input[id$='txtPostCode']").val();
                        locationTracking.trackLocationSearchTriggered(city, postcode);
                        eval(javascriptSearchBtn);
                    }
                }, 200);

            setTimeout(
                function () {
                    $('#validationSearchBtn').hide();
                    $('#validationSearchBtnSimple').hide();
                    if (simpleSearch)
                        $('#loadingGif').show();
                    else {
                        $('#loadingGifComplex').show();
                    }
                }, 300);
        },
        track: function (label) {

            var event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            _gaq.push([
                '_trackEvent',
                event.name = 'Find a Painter',
                event.type = 'CTA Click',
                event.label = label
            ]);
        },
        removeFakeValidationForms: function () {
            var cnt = $("#FindAPainter").contents();
            $("#FindAPainter").replaceWith(cnt);
            var cnt2 = $("#simpleFindAPainter").contents();
            $("#simpleFindAPainter").replaceWith(cnt2);
            
        }
    },
    submitNewSearchResults = {
        setup: function () {
            $("[id$='ImageButton1']").on('click', function (e) {
                submitNewSearchResults.submit();
            });

            // More accurate button link tracking
            $("#hrefMoreAccurateBtn").on('click', function (e) {

                var event = {
                    name: 'Find a Painter',
                    type: null,
                    label: null
                }

                _gaq.push([
                 '_trackEvent',
                 event.name = 'Find a Painter',
                 event.type = 'CTA Click',
                 event.label = "more accurate search"
                ]);
            });
        },
        submit: function () {
            setTimeout(
                function () {
                    $("[id$='ImageButton1']").hide();
                   
                    $('#loadingGifNewSearchResults').show();
                }, 300);
        },
        track: function () {

            var event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            _gaq.push([
                '_trackEvent',
                event.name = 'Find a Painter',
                event.type = 'CTA Click',
                event.label = 'Form Submit'
            ]);
        }
    },
    locationTracking = {
        trackLocations: function () {
            $(".locationLink").on('click', function (e) {

                var event = {
                    name: 'Find a Painter',
                    type: null,
                    label: null
                }

                _gaq.push([
                 '_trackEvent',
                 event.name = 'Find a Painter',
                 event.type = 'CTA Click',
                 event.label = 'Location clicked City: ' + $(this).html(),
                ]);
            });
        }, trackLocationSearchTriggered: function (state, postcode) {

            var event = {
                name: 'Find a Painter',
                type: null,
                label: null
            }

            _gaq.push([
                 '_trackEvent',
                 event.name = 'Find a Painter',
                 event.type = 'CTA Click',
                 event.label = 'Location Search Fired ' + state + ' - ' + postcode
            ]);
        }
    }

    return {
        run: function () {
            page.init();
            validation.init();
            submitNewSearchResults.setup();
            locationTracking.trackLocations();
        }
    }

}());

var simpleSearch = true;