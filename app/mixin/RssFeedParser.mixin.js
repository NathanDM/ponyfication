let FeedParser = require('feedparser');
let request = require('request');

let RSSFeedParser = {
    readRss: function (url) {
        var req = request(url)
            , feedparser = new FeedParser(),
            that = this,
            feedItems = [];

        req.on('response', function (res) {
            var stream = this;
            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
            stream.pipe(feedparser);
        });

        feedparser.on('readable', function () {
            var stream = this
                , item;
            while (item = stream.read()) {
                feedItems.push(item);
                that.setState({feedItems: feedItems});
                console.log(item);
            }
        });
    }
};

module.exports = RSSFeedParser;