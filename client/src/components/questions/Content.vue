<template>
  <div>
    <article style="font-size: 15px;">
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
        <pre>
          <code>
            funtion(){}
          </code>
        </pre>
      </div>
      <div>
        <TagBadge :tag="'HTML'" />
      </div>
    </article>
  </div>
</template>

<script>
import TagBadge from '@/components/TagBadge.vue';

export default {
  name: 'QuestionContent',
  components: {
    TagBadge,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
pre {
  display: block;
  color: #393318;
  margin-bottom: 1em;
  padding: 12px 8px;
  width: auto;
  max-height: 600px;
  overflow: auto;
  font-size: 13px;
  background-color: #eff0f1;
  border-radius: 3px;
}
pre code {
  white-space: inherit;
  padding: 0;
}
</style>
