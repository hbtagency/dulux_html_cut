

var issueController = (function () {

    var _this = this;

    _this.run = function () {
        _this.loadEvents();

        return _this;
    };

    _this.loadEvents = function () {
        $('.issue-dropdown select').change(function () {
            window.location.href = $(this).find('option:selected').attr('data-href');
        });

        $('.btt').live('click',function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, "slow");
        })

    };
    
    return _this.run();

});

$(document).ready(function () {
    var issues = new issueController();
});