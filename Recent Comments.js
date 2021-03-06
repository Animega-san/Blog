// Recent Comments for Blogger v3
// eval
function hp_d11(s) {
    var o = '',
        ar = new Array(),
        os = '',
        ic = 0;
    for (i = 0; i < s.length; i++) {
        c = s.charCodeAt(i);
        if (c < 128) c = c ^ 2;
        os += String.fromCharCode(c);
        if (os.length > 80) {
            ar[ic++] = os;
            os = ''
        }
    }
    o = ar.join('') + os;
    return o
}

//eval
var numComments = numComments || 5,
    avatarSize = avatarSize || 60,
    characters = characters || 40,
    defaultAvatar = defaultAvatar || 'https://www.gravatar.com/avatar/?d=mm',
    moreLinktext = moreLinktext || ' More &raquo;',
    showAvatar = typeof showAvatar === 'undefined' ? true : showAvatar,
    showMorelink = typeof showMorelink === 'undefined' ? false : showMorelink,
    roundAvatar = typeof roundAvatar === 'undefined' ? true : roundAvatar || false,
    maxfeeds = maxfeeds || 50,
    adminBlog = adminBlog || 'Hilman Maulana';

function recent_comments(Hilman) {
    var commentsHtml;
    commentsHtml = '<ul class="recent_comments">';
    ntotal = 0;
    for (var i = 0; i < maxfeeds; i++) {
        var commentlink, authorName, authorAvatar, avatarClass;
        if (i == Hilman.feed.entry.length) {
            break;
        }
        if (ntotal >= numComments) {
            break;
        }
        var entry = Hilman.feed.entry[i];
        for (var l = 0; l < entry.link.length; l++) {
            if (entry.link[l].rel == 'alternate') {
                commentlink = entry.link[l].href;
            }
        }
        for (var a = 0; a < entry.author.length; a++) {
            authorName = entry.author[a].name.$t;
            authorAvatar = entry.author[a].gd$image.src;
        }

        if (authorName != adminBlog && ntotal < numComments) {
            ntotal++;
            commentsHtml += '<a href="'+ commentlink +'"><div>';
            commentsHtml += '<li>';
            if (authorAvatar.indexOf('/s1600/') != -1) {
                authorAvatar = authorAvatar.replace('/s1600/', '/s' + avatarSize + '-c/');
            } else if (authorAvatar.indexOf('/s220/') != -1) {
                authorAvatar = authorAvatar.replace('/s220/', '/s' + avatarSize + '-c/');
            } else if (authorAvatar.indexOf('/s512-c/') != -1 &&
                authorAvatar.indexOf('https:') != 0) {
                authorAvatar = 'https:' + authorAvatar.replace('/s512-c/', '/s' + avatarSize + '-c/');
            } else if (authorAvatar.indexOf('blogblog.com/img/blank.gif') != -1) {
                if (defaultAvatar.indexOf('gravatar.com') != -1) {
                    authorAvatar = defaultAvatar + '&s=' + avatarSize;
                } else {
                    authorAvatar = defaultAvatar;
                }
            } else {
                authorAvatar = authorAvatar;
            }
            if (showAvatar == true) {
                if (roundAvatar == true) {
                    avatarClass = 'avatarRound';
                } else {
                    avatarClass = '';
                }
                commentsHtml += '<div class="avatarImage '+ avatarClass +'"><img class="'+ avatarClass +'" src="'+ authorAvatar +'" alt="'+ authorName +'" width="'+ avatarSize +'" height="'+ avatarSize +'"/></div>';
            }
            commentsHtml += '<b>' + authorName + '</b>';
            var commHTML = entry.content.$t;
            var commBody = commHTML.replace(/(<([^>]+)>)/gi, '');
            if (commBody != '' && commBody.length > characters) {
                commBody = commBody.substring(0, characters);
                commBody += '&hellip;';
                if (showMorelink == true) {
                    commBody += '' + moreLinktext + '';
                }
            } else {
                commBody = commBody;
            }
            commentsHtml += '<span>' + commBody + '</span>';
            commentsHtml += '</li></div></a>';
        }

    }
    commentsHtml += '</ul>';
    document.write(commentsHtml);
}
