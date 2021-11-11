package seoul42.openproject.selectfood.advice;

import lombok.RequiredArgsConstructor;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import seoul42.openproject.selectfood.advice.exception.*;
import seoul42.openproject.selectfood.dto.common.CommonResult;
import seoul42.openproject.selectfood.service.CommonResponseService;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

    private final CommonResponseService commonResponseService;
    private final MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult defaultException(HttpServletRequest request, Exception e) {
        return commonResponseService.getFailResult(-11,
                    "알수 없는 오류가 발생했습니다.");
    }

    @ExceptionHandler(CUserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult userNotFound(HttpServletRequest request, CUserNotFoundException e) {
        return commonResponseService.getFailResult(-12,
                    "계정이 존재하지 않습니다.");
    }

    @ExceptionHandler(CFoodNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult foodNotFound(HttpServletRequest request, CUserNotFoundException e) {
        return commonResponseService.getFailResult(-13,
                "음식 정보가 존재하지 않습니다.");
    }

    @ExceptionHandler(CEmailSigninFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailSigninFailed(HttpServletRequest request, CEmailSigninFailedException e) {
        return commonResponseService.getFailResult(-14,
                    "이메일 또는 비밀번호가 정확하지 않습니다.");
    }

    @ExceptionHandler(CPasswordAuthFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult passwordAuthFailed(HttpServletRequest request, CPasswordAuthFailedException e) {
        return commonResponseService.getFailResult(-15,
                "기존 비밀번호가 일치하지 않습니다.");
    }


    @ExceptionHandler(CEmailExistException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult communicationException(HttpServletRequest request, CEmailExistException e) {
        return commonResponseService.getFailResult(-16,
                    "현재 이메일이 가입되어 있습니다.");
    }
}
