<script>
    import Icon from '../Icon.svelte';
    import Navbar from './navbar.svelte';
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
}

.sidebar{
  width: 180px;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
  padding-top: 150px;
  position: fixed;
}

.sidebar li a{
  padding:20px;
  display: block;
  padding-bottom: 40px;
}    
.sidebar li a{
  color:#6b6161;
}

.sidebar li a .icon{
  display:flex;
  padding-left:35px;
  padding-bottom: 10px;
} 
.sidebar li a .name{
  margin:auto;
  text-align: center;
  padding-top: 10px;
}
.sidebar li a:hover{
  color:#dbd7d7;
  background-color: grey;
}
.sidebar li a:active{
  color:red;
}
    
/* .sidebar li:hover a{
  color: #fff;
} */

.main_content{
  position: fixed;
  margin-left: 300px;
  width: 100%;
  padding : 50px;
}

</style>
    <div class="sidebar">
        <ul>
            <li><a href="/admin">
                 <span class ="icon">
                 <Icon icon="server"/>
                 </span>
                 <div class = "name" >Problems</div>
                 </a>
            </li>
            <li><a href="/showtests">
                <span class ="icon">
                 <Icon icon="folder"/>
                 </span>
                 <div class ="name">Tests</div>
                 </a>
            </li>
            <li><a href="/showresults">
                 <span class ="icon">
                 <Icon icon="user-check"/>
                 </span>
                 <div class ="name" >Results</div>
                 </a>
            </li>
        </ul> 
    </div>