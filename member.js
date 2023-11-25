function skillsMember() {
    var path = document.location.pathname;
    if (path.search('member') > -1) {
        var member = document.querySelector('#member');
        member.style.color = 'red';
    }
}