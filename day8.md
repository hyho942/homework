# HTML / CSS – Study

## 웹 표준 (Web Standard)
W3C (World Wide Consortium)에서 정의하는 기술 표준을 말한다. 사용성과 접근성에 더 높은 초점을 가지고 웹 계발과 다양한 환경에 사용자의 이용을 보장한다. 

## 웹 접근성 (Web Accessibility)
모든 환경에 사용자에게 같은 서비스 제공하며 이용에 차별이 없도록 보장하는 것. 주로 시각, 마우스를 사용하지 못하는 장애인을 위해 제공 되며, 오디오로 웹에 전반적은 정보를 오디오로 제공한다

## [Head]
    <html lang="ko-KR"></html>    

1. 웹 접근성을 지침으로 <head> 안에 페이지의 기본 언어를 선언한다. 
2. Screen Reader 프로그램이 언어를 인식하여 자동으로 음성을 변환하거나 해당 언어에 적합한 발음을 제공한다. 
3. 시각장애인을 위한 보조 속성으로 command + f5를 누르면 실행된다.
4. Ko을 사용하는 경우 영어를 기본적으로 제공 하지만, En은  한글 자동 변환을 지원하지 않는다. 
	
<pre> @import url("./normalize.css"); </pre> 
    
= CSS에서 다른 CSS 파일 연결
	
### float 이슈를 해결하기 위한 css 모듈
<pre> .clearfix::after {
    content: "";
    clear: both; </pre>

## [selector]
* id	
	스타일을 지정할 때 한 가지만 지정해서 사용한다. ( # selector) 
	하나의 문서에 고유한 id 하나밖에 쓸 수 없다.

* class
	룹으로 묶어서 스타일을 지정할 때 사용한다. ( . selector)

		= id / class는 숫자로 시작해서는 안된다.

## [Multi selector]
1. 자식 selector: [ > ] 
	~안에의 의미로 > 만 사용이 가능하며 왼쪽이 부모 혹은 더 큰 selector을 넣는다.
		Ex) div > p (div 안에 P만 선택)

2. 후손 tag: [ space ]
	~안에 있는 A 모두를 선택 할 때 사용한다. 
		Ex) div p (div 안에 P모두 선택)

3. 그룹selector: [ , ] (쉼표)
	다수에 selector에 공통된 스타일을 주고 싶을 경우 사용한다. 
		Ex) div, p, a (div, p, a 모두)

4. 특정 id 값: [ selector.id ]
	~안에 A 특정 태그 선택. 
		Ex) p.foo (p태그 안에  id=”foo”을 가진 요소 선택)

## [Web page 설계 방식]

3단 구조: header, body(content), footer
4단 구조: header, navigation ,body(content), footer

1.	선형화 단계 = 	화면 구성 나누기
2.	시멘틱 요소 = 	그룹화 하기
a.	aside = 부가 정보
b.	article = 독립적인 , section = 콘텐츠 블록  Markup
3.	Naming = 	파스칼 첫 대문자
i.	카멜 첫 소문자 두번째 대문자

## [Semantic Markup]
### [Semantic Markup tag]

<header> 
Header 해당하는 콘텐츠를 markup 할 때 사용. <div id=”header”>로 대체가 가능. Or  <section>안에 <header>을 사용하여 section을 구분 할 수 있음

<footer> 
 Copyright이나 회사 주소 정보를 사용 할 수 있다 <div id=”footer’> 로 대체가 가능.

	<header> <footer>는 문서에 다수 존재해도 되지만 HTML전체 구조에 메인을 담당하는 부분은 한 개만 사용이 가능하다. 
	
<section> 
콘텐츠를 grouping 할 때 사용. Section 안에 section을 사용 할 수 있어서 중첩 사용이 가능하다. 

<nav>
Navigation의 줄임말. 네비게이션 메뉴를 나타낸다.

<article>
독립적인 글들을 나타낼 때 사용. 블로그 포스팅 표현 할 때 사용하지만, RSS feed로 배포할 가치가 있는 컨텐츠에 사용.

<aside>
콘텐츠와 관계 있는 부가 정보들을 표시 할 때 사용 . 흔히 side-bar콘텐츠들을 담기 위해  사용 

<main>
주로 웹 페이지를 구성하는 메인 콘텐츠를 담는 태그이다. <body>태그를 사용하여 구분할 수 있다. 


## [Box Model]
= Float
	Left
	Right
	Clear: both
= Display
	Inline
	Inline-block
	Block
= Overflow
	Hidden

= Flex
	Content
	Items
= Box-sizing
	Border-box

[Object size]
= Vm 
= Vw


[가상에 박스 모델]
*::before { }
*::after { }

	

 
