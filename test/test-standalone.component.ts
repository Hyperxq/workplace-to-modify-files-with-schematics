import { HttpClientModule } from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'photo-gallery',
  imports: [HttpClientModule],
  template: ` ... <image-grid [images]="imageList"></image-grid> `,
})
export class PhotoGalleryComponent {
  // component logic
}
