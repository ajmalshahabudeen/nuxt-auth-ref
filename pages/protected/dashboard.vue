<template>
  <div class="flex flex-col p-10 h-screen gap-5">
    <div>
      <p class="text-3xl font-extralight">Dashboard</p>
    </div>
    <Tabs default-value="account" class="w-full">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <DashboardAccount />
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<style>

</style>