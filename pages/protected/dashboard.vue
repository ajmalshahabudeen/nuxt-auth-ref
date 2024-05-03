<template>
  <div class="flex flex-col p-10 h-screen gap-5">
    <div>
      <p class="text-3xl font-extralight">Dashboard</p>
    </div>
    <Tabs default-value="account" class="w-full">
      <TabsList class="px-10 mb-10">
        <TabsTrigger class="px-10" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger class="px-10" value="user">
          User
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <DashboardAccount />
      </TabsContent>
      <TabsContent value="user">
        <DashboardUser />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<style></style>