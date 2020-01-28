<template>
  <nav class="col-md-2 d-none d-md-block border-right sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="#">
            <span data-feather="home"></span>
            Home<span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <h6 :class="line">
        <span>Public</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column ml-2 mb-2 public">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file"></span>
            StuckOverlow
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="shopping-cart"></span>
            Tags
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="users"></span>
            Users
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="$emit('isSearch')">
            <b-icon-search font-scale="2"></b-icon-search>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {
      line:
        'sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted',
    };
  },
};
</script>

<style lang="css" scoped>
.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
.public .nav-item a.nav-link {
  padding: 0.2rem 0.8rem !important;
}
</style>
