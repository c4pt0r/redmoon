function load_template(tmpl_name, tmpl_data) {
    if ( !load_template.tmpl_cache ) { 
        load_template.tmpl_cache = {};
    }

    if ( ! load_template.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/static/templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.tpl';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        load_template.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }

    return load_template.tmpl_cache[tmpl_name](tmpl_data);
}