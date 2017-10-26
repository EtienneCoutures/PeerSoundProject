$(function () {
    $("a[rel='popover']").popover({html:true});
    if (readCookie("sidebar-collapsed") == "true") {
        sidebarCollapse();
    }
});
$(".sidebar-collapse").click(sidebarCollapse);

var rest = {
    delete:function (url, message) {
        if (confirm(message || "confirm")) {
            $.ajax({
                url:url,
                type:'DELETE'
            }).done(function () {
                location.reload();
            });
        }
    }
};

function editRow(evt, url) {
    if(!evt.target.classList.contains('action-buttons')) {
        document.location.href = url;
    }
}

$(function () {
    var dataTables_wrapper = {
        filters:{},
        sort:undefined,
        page:undefined
    };
    $(".dataTables_wrapper .filters .filter-container *").change(changeDataTablesWrapperFilters);
    $(".dataTables_wrapper a.sort-link").click(sortDataTablesWrapper);
    $(".dataTables_wrapper .dataTables_paginate a").click(loadDataTablePage);

    function changeDataTablesWrapperFilters() {
        if (this.name) {
            if (this.value != "") {
                dataTables_wrapper.filters[this.name] = this.value;
            } else {
                delete dataTables_wrapper.filters[this.name];
            }
            delete dataTables_wrapper.page;
            loadDataTablesWrapperWithFilters($(this).parents(".dataTables_wrapper"));
        }
    }

    function sortDataTablesWrapper(event) {
        event.preventDefault();
        var sort = this.href;
        sort = sort.substr(sort.indexOf('?') + 1);
        if (dataTables_wrapper.sort == sort) {
            sort = sort.split('=');
            sort[1] = '-' + sort[1];
            sort = sort.join('=');
        }
        dataTables_wrapper.sort = sort;
        delete dataTables_wrapper.page;
        loadDataTablesWrapperWithFilters($(this).parents(".dataTables_wrapper"));
    }

    function loadDataTablesWrapperWithFilters(dataTable) {
        var query = ['ajax=1'];
        for (var i in dataTables_wrapper.filters) {
            if (dataTables_wrapper.filters.hasOwnProperty(i))
                query.push(i + "=" + dataTables_wrapper.filters[i]);
        }
        if (dataTables_wrapper.sort) {
            query.push(dataTables_wrapper.sort);
        }
        if (dataTables_wrapper.page) {
            query.push(dataTables_wrapper.page);
        }
        query = query.join("&");
        $.get(document.location.origin + document.location.pathname + "?" + query, function (data, status) {
            if (status == 'success') {
                $("#" + dataTable.attr('id') + " tbody").html($('#' + dataTable.attr('id') + ' tbody', data).html());
                $("#" + dataTable.attr('id') + " .row-fluid").html($('#' + dataTable.attr('id') + ' .row-fluid', data).html());

                $("#" + dataTable.attr('id') + " .dataTables_paginate a").click(loadDataTablePage);
            }
        });
    }

    function loadDataTablePage(event) {
        event.preventDefault();
        var page = this.href;
        dataTables_wrapper.page = page.substr(page.indexOf('?') + 1);
        loadDataTablesWrapperWithFilters($(this).parents(".dataTables_wrapper"));
    }
});


function sidebarCollapse() {
    $(".sidebar").toggleClass("menu-min");
    $(".sidebar-collapse i").toggleClass("icon-double-angle-left");
    $(".sidebar-collapse i").toggleClass("icon-double-angle-right");
    if ($(".sidebar").hasClass("menu-min")) {
        createCookie("sidebar-collapsed", true);
    } else {
        eraseCookie("sidebar-collapsed");
    }
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
