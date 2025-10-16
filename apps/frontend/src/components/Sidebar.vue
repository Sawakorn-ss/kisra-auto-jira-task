<template>
  <aside class="w-72 bg-white border-r border-gray-200 flex flex-col justify-between">
    <div>
      <div class="p-4">
        <button
          class="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition"
        >
          📝 New Requirement
        </button>
      </div>

      <div class="px-4 mt-6 text-gray-600">
        <p class="uppercase text-xs font-semibold mb-3">Features</p>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 text-sm cursor-pointer hover:text-black">
            <span class="text-gray-500">📜</span>
            History
          </li>

          <!-- Project 1 -->
          <li>
            <details open class="group">
              <summary
                class="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800"
              >
                <span>📁 Project 1</span>
              </summary>
              <ul class="ml-6 mt-2 space-y-1 text-sm text-gray-500">
                <li>Requirement 1</li>
                <li>Requirement 2</li>
                <li>Requirement 3</li>
              </ul>
            </details>
          </li>

          <!-- Project 2 -->
          <li>
            <details class="group">
              <summary
                class="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800"
              >
                <span>📁 Project 2</span>
              </summary>
              <ul class="ml-6 mt-2 space-y-1 text-sm text-gray-500">
                <li>Requirement 1</li>
                <li>Requirement 2</li>
                <li>Requirement 3</li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="p-4 mt-auto bg-gradient-to-t from-yellow-50 via-transparent to-transparent"
    >
      <div class="flex items-center gap-3 text-sm text-gray-600">
        <div class="w-8 h-8 rounded-full bg-gray-300"></div>
        <div>
          <p class="font-medium text-gray-800">Maxim Nuel</p>
          <p class="text-xs text-gray-500">hey@agency.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
