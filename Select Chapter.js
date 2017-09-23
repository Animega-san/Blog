function SelectChapter(json) {
 document.write('<div class="ChapterList"><span>Select Chapter</span><div class="ChapterSelect">');
 for (var i = 0; i < json.feed.entry.length; i++)
 {
    for (var j = 0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == 'alternate') {
        break;
      }
    }
var entryUrl = "'" + json.feed.entry[i].link[j].href + "'";//bs
var entryTitle = json.feed.entry[i].title.$t;
var item = "<a href="+ entryUrl + '">' + entryTitle + "</a>";
 document.write(item);
 }
 document.write('</div></div>');
 }

$(document).ready(function(){
  $(".ChapterList").click(function(){
    $(".ChapterSelect").slideToggle("slow");
  });
