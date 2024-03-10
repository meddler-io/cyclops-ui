import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-debug',
  templateUrl: './performance-debug.component.html',
  styleUrls: ['./performance-debug.component.scss']
})
export class PerformanceDebugComponent implements OnInit {
  fps: number = 0;
  scrollEventThrottle: number = 0;
  totalDomElements: number = 0;
  isLayoutThrashing: boolean = false;
  cpuUsage: number = 0;
  usedMemory: number = 0;
  totalMemory: number = 0;
  jsHeapSizeLimit: number = 0;

  ngOnInit(): void {
    this.monitorPerformance();
    // Update performance info every 5 seconds (adjust as needed)
    setInterval(() => this.monitorPerformance(), 5000);
  }

  monitorPerformance(): void {
    // FPS, Scroll Event Throttle, Total DOM Elements, Layout Thrashing, and CPU Usage remain the same

    // Memory Usage
    this.updateMemoryInfo();
  }

  updateMemoryInfo(): void {
    // Use type assertion to let TypeScript know that performance.memory is available
    const memory = (performance as any).memory;

    if (memory) {
      // Convert memory values to megabytes
      this.usedMemory = +(memory.usedJSHeapSize / (1024 * 1024)).toFixed(2);
      this.totalMemory = +(memory.totalJSHeapSize / (1024 * 1024)).toFixed(2);
      this.jsHeapSizeLimit = +(memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2);
    } else {
      // Handle the case where memory information is not available
      console.warn('Memory information not available in this environment.');
    }
  }
}