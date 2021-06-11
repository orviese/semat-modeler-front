<template>
  <b-container>
    <h2>Available Practices</h2>
  </b-container>
  <!--
    <b-col id="dashboard-parent" :class="[{'collapsed' : collapse}]">
      <div class="dashboard-container">
        <router-view></router-view>
      </div>
      <sidebar-menu class="mt-5" :menu="menu" :theme="theme" width="250px" @toggle-collapse="onToggleCollapse">
        <template #toggle-icon>
          <i class="fas fa-bars"></i>
        </template>
      </sidebar-menu>
    </b-col> -->
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'SEMOVA',
          hiddenOnCollapse: true
        },
        {
          href: '/profile',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          title: 'Kernel',
          icon: 'fa fa-cog',
          child: [
            {
              href: '/areas-of-concern',
              title: 'Areas Of Concern',
              icon: 'fa fa-graduation-cap'
            },
            {
              href: '',
              title: 'Alphas',
              icon: 'fa fa-spinner'
            },
            {
              href: '',
              title: 'Activity Spaces',
              icon: 'fa fa-bars'
            }
          ]
        },
        {
          title: 'Practices',
          icon: 'fa fa-object-group',
          child: [
            {
              href: '/hello',
              title: 'Build'
            },
            {
              href: '/about',
              title: 'Validate'
            }
          ]
        }
      ],
      theme: 'white-theme',
      width: '250px',
      relative: true,
      collapse: false
    }
  },
  methods: {
    onToggleCollapse(collapse){
      this.collapse = collapse;
    }
  }
}
</script>

<style scoped>
#dashboard-parent {
  padding-left: 255px;
  transition: 0.3s ease;
}
#dashboard-parent.collapsed {
  padding-left: 55px;
}
</style>