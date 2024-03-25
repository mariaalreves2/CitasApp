import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/imember';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/_models/iuser';
import { AccountService } from 'src/app/_services/account.service';
import { switchMap, take } from 'rxjs';
import { IPhoto } from 'src/app/_models/iphoto';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: IMember | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: IUser | undefined;

  constructor(private accountService: AccountService, 
    private membersService: MembersService) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: user => {
          if (user) this.user = user;
        }
      });
  }

  setMainPhoto(photo: IPhoto) {
    this.membersService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    });
  }


  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  deletePhoto(photoId: number) {
    console.log("photoId: " + photoId);
    this.membersService.deletePhoto(photoId).subscribe({
      next: () => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(p => p.id !== photoId);
        }
      }
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/photo",
      authToken: "Bearer " + this.user?.token,
      isHTML5: true,
      allowedFileType: [ 'image' ],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }
  }
}