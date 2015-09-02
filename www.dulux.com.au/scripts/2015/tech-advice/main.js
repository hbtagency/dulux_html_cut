$(function() {

    /*
     ------- Initialise app for filtering advice tiles nad showing modals
     */

    AdviceApp.tiles.init({
        els: {
            container: $('.main-content.grid'),
            tiles: $('.main-content.grid .grid__item'),
            loadMore: $('#advice-load-more'),
            noResults: $('#advice-no-results'),
        },
        showMore: 10,
    });

    // init modal window
    AdviceApp.modal.init({
        els: {
            container: $('#advice-modal'),
            content: $('#advice-modal .modal__body'),
        },
    });

    // filter to default tiles on page load
    defaultFilter();

    // disable loading animation
    $('.main-content').addClass('loaded');


    /*
     ------- "Load more" button interaction
     */

    $('#advice-load-more').on('click', function(e) {
        e.preventDefault();

        AdviceApp.tiles.more();
    });


    /*
     ------- Clear filters
     */

    $('.clear-search').on('click', function(e) {
        e.preventDefault();

        defaultFilter();
    });


    /*
     ------- Filter tiles when using Category menu
     @todo: change to routing?
     */

    // category navigation handler
    $('.main-nav').on('click', 'a:not(.home)', function(e) {
        e.preventDefault();

        // filter tiles
        AdviceApp.tiles.filter({
            type: 'category',
            value: $(this).data('category'),
            sort: 'date',
        });

        // set link active state
        $(e.delegateTarget).find('li').removeClass('active');
        $(this).closest('li').addClass('active');

        // clear home active state
        $('.main-nav .home').removeClass('active');

        // hide search clear button
        $('.search-form .clear').removeClass('show');
    });


    /*
     ------- Filter tiles when searching
     */

    // search button clicked
    $('.search-form .search').on('click', function(e) {
        e.preventDefault();

        submitSearch();
    });

    // search field ENTERed
    $('#search').keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);

        if (code === 13) submitSearch();
    });


    /*
     ------- Open/close YT modal windows
     */

    $('.main-content.grid').on('click', 'a[data-yt]', function(e) {
        e.preventDefault();

        AdviceApp.modal.open($(this).data('yt'));
    });

    $('#advice-modal').on('click', '.modal__overlay, .modal__close', function(e) {
        e.preventDefault();

        AdviceApp.modal.close();
    });


    /*
     ------- Helpers
     */

    function defaultFilter() {
        // clear search box
        $('#search').val('');

        // featured tiles
        AdviceApp.tiles.filter({ type: 'featured', sort: 'date' });

        // clear selected categories active state
        $('.main-nav li').removeClass('active');

        // add home active state
        $('.main-nav .home').addClass('active');

        // hide search clear button
        $('.search-form .clear').removeClass('show');
    }

    function submitSearch() {
        var term = $('#search').val();

        // if empty search, revert to featured tiles
        if (!term) return defaultFilter();

        // filter tiles
        AdviceApp.tiles.filter({
            type: 'search',
            value: term,
            sort: 'relevance',
        });

        // show "clear" button
        $('.search-form .clear').addClass('show');

        // clear selected categories active state
        $('.main-nav li').removeClass('active');

        // clear home active state
        $('.main-nav .home').removeClass('active');
    }

});
