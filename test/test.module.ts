import { HttpClientModule } from "@angular/common/http";

// shared.module.ts
@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [GreeterComponent],
  exports: [GreeterComponent],
})
export class SharedModule {}
