var AdviceApp = AdviceApp || {};

AdviceApp.tiles = (function() {

    var $container, $tiles,
        _options,
        _tilesIndex = [],
        _lunrIndex = null,
        _searchResults = [];

    // ---- Private

    var _indexTiles = function() {
        $tiles.each(function() {
            // construct tile object with relevant filtering data for index
            var tile = {
                el:         this,
                id:         $(this).data('id'),
                title:      $(this).find('.title').text(),
                excerpt:    $(this).find('.excerpt').text(),
                categories: ($(this).data('categories')) ? $(this).data('categories').split(',') : [],
                featured:   $(this).data('featured'),
                date:       $(this).data('date'),
            };

            // add tile data to Lunr index
            _lunrIndex.add({
                id:     tile.id,
                title:  tile.title,
                body:   tile.excerpt,
                tags:   tile.categories.join(' ')
            });

            // add tile data to our own index
            _tilesIndex.push(tile);
        });

        debug.log('Tiles index:', _tilesIndex);

        return _tilesIndex;
    };

    var _initLunr = function() {
        // initialise Lunr
        // https://github.com/olivernn/lunr.js/

        _lunrIndex = lunr(function() {
            this.field('title', { boost: 10 });
            this.field('body');
        });
    };

    var _filter = function(map) {
        var show = [];

        // search for all tiles that pass map
        show = _tilesIndex.map(map);

        // povo array compact
        show = show.filter(function(v, k) { return v; });

        return show;
    };

    var _sort = function($els, type) {
        debug.log('Sorting elements:', $els, type);

        $els.detach();

        // sort by date, descending
        if (type === 'date') {
            $els.sort(function(a, b) {
                return ($(a).data('id') < $(b).data('id')) ? -1 : 1;
            });

        // sort by search relevance, ascending
        } else if (type === 'relevance') {
            var r = {};

            // map Lunr search results to easy to access object
            _searchResults.forEach(function(v, k) {
                r[parseInt(v.ref, 10)] = v.score;
            });

            $els.sort(function(a, b) {
                return (r[$(a).data('id')] > r[$(b).data('id')]) ? -1 : 1;
            });
        }

        $els.appendTo($container);

        return $els;
    };

    var _filterFeatured = function(sort) {
        // find tiles to show shown
        var show = _filter(function(v, k) {
            if (v.featured) return v.el;
        });

        debug.log('_filterFeatured result:', show);

        // hide existing tiles
        _hideTiles();

        // show the array of tile elements
        _showTiles(show, sort);

        return show;
    };

    var _filterCategory = function(category, sort) {
        // find tiles to show shown
        var show = _filter(function(v, k) {
            if (v.categories.indexOf(category) !== -1) return v.el;
        });

        debug.log('_filterCategory result:', show);

        // hide existing tiles
        _hideTiles();

        // show the array of tile elements
        _showTiles(show, sort);

        return show;
    };

    var _filterSearch = function(term, sort) {
        var results, ids, show;

        // search lunr index
        results = _lunrIndex.search(term);

        // @todo: we're adding global state to app so we can retrieve the
        // sorting relevance later. Global state === bad, how can we pass sort
        // to sorting function?
        _searchResults = results;

        debug.log('_filterSearch - Lunr.js result:', results);

        // get list of tile ids
        ids = results.map(function(v, k) {
            return parseInt(v.ref, 10);
        });

        // find tiles to show shown
        show = _filter(function(v, k) {
            if (ids.indexOf(v.id) !== -1) return v.el;
        });

        debug.log('_filterSearch result tiles:', show);

        // hide existing tiles
        _hideTiles();

        // show the array of tile elements
        _showTiles(show, sort);

        return show;
    };

    var _showTiles = function(els, sort) {
        var $els, $first, $rest;

        $els = (typeof els !== 'undefined') ? $(els) : $tiles;

        // sort $els before showing them
        if (sort) $els = _sort($els, sort);

        // setTimeout ensure any DOM sorting has happened before showing elements
        window.setTimeout(function() {
            // if enabled, show x number of tiles now and then the rest when
            // "load more" is clicked
            if (!_options.showMore) {
                $els.addClass('show');
            } else {
                // show the first x, the rest are "load more"
                $first = $els.filter(':lt(' + _options.showMore + ')');
                $rest = $els.not($first);

                $first.addClass('show');
                $rest.addClass('show-later');

                // show/hide "load more" button if needed
                if ($rest.length) {
                    _showLoadMore();
                } else {
                    _hideLoadMore();
                }
            }
        }, 0);
    };

    var _hideTiles = function() {
        // visible tiles + tiles to be visible (load more)
        $tiles.removeClass('show show-later');
    };

    var _showLoadMore = function() {
        $loadMore.addClass('show');
    };

    var _hideLoadMore = function() {
        $loadMore.removeClass('show');
    };


    // ---- Public

    var filter = function(opts) {
        debug.log('Filtering tiles with options:', opts);

        var result = [];

        if (opts.type === 'featured') {
            result = _filterFeatured(opts.sort);
        } else if (opts.type === 'category') {
            result = _filterCategory(opts.value, opts.sort);
        } else if (opts.type === 'search') {
            result = _filterSearch(opts.value, opts.sort);
        } else {
            debug.warn('No valid filtering type.');
        }

        // if no results, show message
        $('.no-results').toggleClass('show', !(!!result.length));
    };

    var showMore = function() {
        // Find tiles for current filter "view" that are hidden ('.show-later')
        // and show them. All remaining tiles are shown in one go.

        $tiles.filter('.show-later')
            .removeClass('show-later')
            .addClass('show');

        _hideLoadMore();
    };

    var init = function(opts) {
        debug.log('Initializing tiles with options:', opts);

        _options = opts;

        $container = opts.els.container;
        $tiles = opts.els.tiles;
        $loadMore = opts.els.loadMore;

        _initLunr();
        _indexTiles();
    };

    return {
        init: init,
        filter: filter,
        more: showMore,
    };

})();


AdviceApp.modal = (function() {

    var $container, $content,
        _options;

    // ---- Private

    // ---- Public

    var init = function(opts) {
        debug.log('Initializing modal with options:', opts);

        _options = opts;

        $container = opts.els.container;
        $content = opts.els.content;
    };

    var open = function(yt) {
        var html = '';

        debug.log('Opening modal window with YT video:', yt);

        // construct YT embed iframe and insert into modal
        html += '<iframe width="700" height="394" src="//www.youtube.com/embed/' + yt;
        html += '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>';
        $(html).appendTo($content);

        $container.addClass('show');
    };

    var close = function() {
        $container.removeClass('show');

        // @todo: change to listent to end of css transition
        window.setTimeout(function() {
            $content.empty();
        });
    };

    return {
        init: init,
        open: open,
        close: close,
    };

})();
