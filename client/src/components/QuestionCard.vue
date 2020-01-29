<template>
  <div
    class="w-full border-t border-b border-grey-200 flex rounded-sm"
    style="cursor: pointer;"
  >
    <div class="w-24 pl-5 py-3 text-center flex items-center h-48">
      <div>
        <div>0</div>
        <div>Vote(s)</div>
        <div class="mt-10">0</div>
        <div>Answer(s)</div>
      </div>
    </div>
    <div class="py-3 pl-8 w-5/6">
      <h1 class="text-xl text-blue-400">
        Contoh judul pertanyaan yang lumayan panjang kita tambah hin panjang
        dari judul yang ga jelas ini ya?
      </h1>
      <div class="flex mt-5 mb-1">
        <img src="https://placekitten.com/200/200" width="24" height="24" />
        <p class="ml-1 font-hairline tracking-wide">Username</p>
      </div>
      <small class="italic text-gray-600">Created at 6 Jan 2020 6:12PM</small>
      <p class="mt-8 truncate">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-card',
}
</script>

<style></style>
