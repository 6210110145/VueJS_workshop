<template>
  <div>
    <v-card
    color="grey lighten-4"
    flat
    tile >
        <v-toolbar
        height="70px"
        dense >
          
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

            <v-toolbar-title v-toolbar-title>Shop Store</v-toolbar-title>
            
            <!-- <v-spacer></v-spacer> -->

            <v-text-field
            class="mx-8"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted >
            </v-text-field>

            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn text ="mr-2">login</v-btn>
            <v-btn text>register</v-btn>

            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-menu 
            offset-y
            open-on-hover
             >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on" >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index" >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
    data: () => ({
        items: [
            { title: 'Click Me' },
            { title: 'Click Me 2' },
            { title: 'Click Me 3' },
        ],
    }),
}
</script>

<style>

</style>