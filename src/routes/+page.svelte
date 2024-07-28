<script lang="ts">
  import { onMount } from 'svelte';

  type Resource = {
    id: string;
    name: string;
  };
  let resources: Resource[] = [];

  let inputText: string = '';

  // ページロード時にローカルストレージからデータを取得
  onMount(() => {
    const saved = localStorage.getItem('savedResources');
    if (saved) {
      resources = JSON.parse(saved);
    }
  });

  // フォームに入力されたテキストのresourceを保存する
  function handleSave() {
    resources.push({
      id: crypto.randomUUID(),
      name: inputText,
    });
    resources = resources;
    // ローカルストレージにデータを保存
    localStorage.setItem('savedResources', JSON.stringify(resources));
  }

  // リソースを削除する
  function handleDelete(id: string) {
    resources = resources.filter((resource) => resource.id !== id);
    resources = resources;
    localStorage.setItem('savedResources', JSON.stringify(resources));
  }
</script>

<input type="text" bind:value={inputText} placeholder="テキスト入力フォーム" />
<button on:click={handleSave}>実行</button>
<ul>
  {#each resources as resource}
    <li>
      <button on:click={() => handleDelete(resource.id)}>削除</button>
      {resource.id}: {resource.name}
    </li>
  {/each}
</ul>
