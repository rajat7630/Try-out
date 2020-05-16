<script>
  import feather from 'feather-icons';

  export let icon = 'square';
  export let attr = {};
</script>

{@html feather.icons[icon] ? feather.icons[icon].toSvg({ class: $$props.class, ...attr }) : ''}
