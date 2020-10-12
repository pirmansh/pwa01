document.addEventListener("DOMContentLoaded", function () {
    
    loadApi();

    function loadApi(){
    
        const xhr = new XMLHttpRequest();
    
        xhr.open('GET', 'https://my-json-server.typicode.com/pirmansh/database/db', true);
    
        xhr.onload = function(){
            if(this.status === 200){
    
                const response = JSON.parse(this.responseText);

                let content = '';
    
                response.blogs.forEach( function( item ) {
                
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
        }
        xhr.send();
    }

});