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
  width: 200px;
  height: 100%;
  padding: 40px;
  position: fixed;
  background-color:#7B8788;
}

.sidebar li a{
  padding:20px;
  margin:auto;
  display: block;
  padding-bottom: 40px;
}    
.sidebar li a{
  color:#6b6161;
}

.sidebar li a .icon{
  margin:auto;
  padding-left: 25px;
  padding-bottom: 5px;
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
.sidebar li a:active,a:visited ,a:focus{
  background-color:red;
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
<body>
  <Navbar/>
  <div>
    <div class="sidebar">
        <ul>
            <li><a href="/" class="active">
                <span class ="icon">
                 <Icon icon="home"/>
                 </span>
                 <div class ="name">Home</div>
                </a>
            </li>
            <li><a href="/showproblems">
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
            <li><a href="/results">
                 <span class ="icon">
                 <Icon icon="user-check"/>
                 </span>
                 <div class ="name" >Results</div>
                 </a>
            </li>
        </ul> 
    </div>
     <div class="main_content">
        <slot></slot>
    </div>
  </div>
</body>