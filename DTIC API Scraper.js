{
	"translatorID": "6b3f9b7c-1d4a-4e8f-a9b2-2c5e8d9f0a1b",
	"label": "DTIC API Scraper",
	"creator": "Custom Developer",
	"target": "^https?://apps\\.dtic\\.mil/sti/citations/",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": false,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2026-04-24 10:00:00"
}

function detectWeb(doc, url) {
    if (url.match(/\/sti\/citations\/[A-Z0-9]+/i)) {
        return "report";
    }
    return false;
}

function doWeb(doc, url) {
    var match = url.match(/\/sti\/citations\/([A-Z0-9]+)/);
    if (!match) return;

    var adNumber = match[1];
    var jsonUrl = "https://apps.dtic.mil/sti/citation/" + adNumber + ".json";

    Zotero.Utilities.doGet(jsonUrl, function(text) {
        var data = JSON.parse(text);
        var newItem = new Zotero.Item("report");

        newItem.title = data.UnclassifiedTitle;
        newItem.reportNumber = data.AccessionNumber;
        newItem.institution = data.CorporateAuthor;
        newItem.abstractNote = data.Abstract;

        if (data.PersonalAuthors && data.PersonalAuthors.length > 0) {
            for (var i = 0; i < data.PersonalAuthors.length; i++) {
                newItem.creators.push(Zotero.Utilities.cleanAuthor(data.PersonalAuthors[i], "author", true));
            }
        }

        if (data.ReportDate) {
            newItem.date = data.ReportDate.substring(0, 10);
        }

        if (data.PaginationOrMediaCount) {
            newItem.pages = data.PaginationOrMediaCount;
        }

        // 标签精简代码：只提取带星号的核心标签，并去星号
        if (data.Descriptors) {
            for (var j = 0; j < data.Descriptors.length; j++) {
                var tagStr = data.Descriptors[j];
                if (tagStr.startsWith('*')) {
                    newItem.tags.push(tagStr.replace('*', ''));
                }
            }
        }

        newItem.url = url;

        if (data.FullTextPath) {
            newItem.attachments.push({
                url: data.FullTextPath,
                title: "DTIC Full Text PDF",
                mimeType: "application/pdf"
            });
        }

        newItem.complete();
    });
}
