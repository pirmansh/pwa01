document.addEventListener("DOMContentLoaded", function () {
    
    var _url = 'https://my-json-server.typicode.com/pirmansh/database/db';

    function renderPage(data){

                var content = '';
    
                data.blogs.forEach( function( item ) {
                
                 content += `
                    <article class="box">
                        <h5 ><a href="#" >${item.title}</a></h5>
                        <div class="grey-text lighten-5-text">
                            <a href="#" >${item.first_name}</a>,
                            <span>${item.date}</span>    
                        </div>
                        <p>${item.content}</p>
                        <a href="#" class="btn light-blue link">read more</a>
                    </article>
                    `;
            });

            document.getElementById('blogs').innerHTML = content;
    }
    var netReceive = false;

    var netUpdate = fetch(_url).then(function(res){
        return res.json()
    }).then(function(data){
        netReceive = true;
        renderPage(data);
    });

    caches.match(_url).then(function(res){
        if(!res) throw Error('belum ada data di cache')
        return res.json()
    }).then(function(data){
        if(!netReceive){
            renderPage(data)
            console.log('render daricache')
        }
    }).catch(function(){
        return netUpdate;
    });
});