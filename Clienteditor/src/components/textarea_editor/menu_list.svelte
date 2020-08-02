<script>
  import { tick } from "svelte";
  imp
</script>

<style>
  .style-button {
    @apply py-1 pr-3 text-xl outline-none;
  }
</style>

<div class="flex border-solid border-2 py-2 rounded-lg my-3">
  <div class="mr-8">
    <button
      on:click={e => {
        document.execCommand('bold', false, '');
      }}
      class="style-button pl-4 fa fa-bold" />
    <button
      on:click={e => {
        document.execCommand('italic', false, '');
      }}
      class="style-button fa fa-italic" />
    <button
      on:click={e => {
        document.execCommand('underline', false, '');
      }}
      class="style-button fa fa-underline" />
  </div>
  <div class="mr-8">

    <button
      class="style-button fa fa-align-left"
      on:click={() => {
        document.execCommand('justifyLeft', false, '');
      }} />
    <button
      class="style-button fa fa-align-center"
      on:click={() => {
        document.execCommand('justifyCenter', false, '');
      }} />
    <button
      class="style-button fa fa-align-right"
      on:click={() => {
        document.execCommand('justifyRight', false, '');
      }} />
  </div>
  <div class="mr-8">

    <button
      class="style-button fa fa-strikethrough"
      on:click={() => {
        document.execCommand('strikeThrough', false, '');
      }} />
    <button
      class="style-button fa fa-subscript"
      on:click={() => {
        document.execCommand('subscript', false, '');
      }} />
    <button
      class="style-button fa fa-superscript"
      on:click={() => {
        document.execCommand('superscript', false, '');
      }} />
  </div>

</div>
