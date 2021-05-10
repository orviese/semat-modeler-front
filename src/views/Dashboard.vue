<template>
    <b-col id="dashboard-parent" :class="[{'collapsed' : collapse}]">
      <div class="dashboard-container">
        <router-view></router-view>
      </div>
      <sidebar-menu class="mt-5" :menu="menu"
                    :theme="theme" width="250px"
          @toggle-collapse="onToggleCollapse">
        <template #toggle-icon>
          <i class="fas fa-bars"></i>
        </template>
      </sidebar-menu>
    </b-col>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Menu navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/profile',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          title: 'Charts',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/hello',
              title: 'Alphas'
            },
            {
              href: '/about',
              title: 'Activities'
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