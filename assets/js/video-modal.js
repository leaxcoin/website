$(function () {
    $('#videoModal').on('shown.bs.modal', e => {
        $(".yvideo").each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
        });
    });
    
    $('#videoModal').on('hidden.bs.modal', e => {
        $(".yvideo").each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
    });
});