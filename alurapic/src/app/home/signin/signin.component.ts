import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{
    
    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ){}
    
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params.fromUrl);
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            passWord: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus();
    }

    login(){
        const userName = this.loginForm.get('userName').value;
        const passWord = this.loginForm.get('passWord').value;


        this.authService
            .authenticate(userName, passWord)
            .subscribe( 
                () => {
                    this.fromUrl ? this.router.navigateByUrl(this.fromUrl) : this.router.navigate(['user', userName])                    
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid username or password');
                }
            );
    }
}

