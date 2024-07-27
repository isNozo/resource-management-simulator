<script>
  import { onMount } from 'svelte';

  let inputText = '';
  let savedText = '';

  // ページロード時にローカルストレージからデータを取得
  onMount(() => {
    const saved = localStorage.getItem('savedText');
    if (saved) {
      savedText = saved;
    }
  });

  function handleSave() {
    savedText = inputText;
    // ローカルストレージにデータを保存
    localStorage.setItem('savedText', savedText);
  }
</script>

<input type="text" bind:value={inputText} placeholder="テキスト入力フォーム" />
<button on:click={handleSave}>実行</button>
<p>保存されたテキスト: {savedText}</p>
